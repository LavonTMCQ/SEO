import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'

export const projectRouter = router({
  // Get all user projects
  getAll: publicProcedure.query(async ({ ctx }) => {
    // If no session, return empty array
    if (!ctx.session?.user?.id) {
      return []
    }

    const projects = await ctx.prisma.project.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        keywords: {
          include: {
            rankings: {
              orderBy: { date: 'desc' },
              take: 1,
            },
          },
        },
        _count: {
          select: {
            keywords: true,
            audits: true,
            backlinks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Calculate average position for each project
    const projectsWithStats = projects.map(project => {
      const latestRankings = project.keywords
        .map(keyword => keyword.rankings[0])
        .filter(Boolean)

      const avgPosition = latestRankings.length > 0
        ? latestRankings.reduce((sum, ranking) => sum + ranking.position, 0) / latestRankings.length
        : 0

      return {
        ...project,
        avgPosition: Math.round(avgPosition * 10) / 10,
      }
    })

    return projectsWithStats
  }),

  // Get single project by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          keywords: {
            include: {
              rankings: {
                orderBy: { date: 'desc' },
                take: 30, // Last 30 rankings for trend analysis
              },
            },
          },
          audits: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          backlinks: {
            orderBy: { discovered: 'desc' },
            take: 100,
          },
        },
      })

      if (!project) {
        throw new Error('Project not found')
      }

      return project
    }),

  // Create new project
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Project name is required'),
        domain: z.string().url('Please enter a valid domain URL'),
        settings: z.object({}).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      })
      return project
    }),

  // Update project
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        domain: z.string().url().optional(),
        settings: z.object({}).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const project = await ctx.prisma.project.updateMany({
        where: {
          id,
          userId: ctx.session.user.id,
        },
        data,
      })

      if (project.count === 0) {
        throw new Error('Project not found or unauthorized')
      }

      return project
    }),

  // Delete project
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      })

      if (project.count === 0) {
        throw new Error('Project not found or unauthorized')
      }

      return { success: true }
    }),
})
