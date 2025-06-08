import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'

export const userRouter = router({
  // Get current user profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        projects: {
          include: {
            keywords: true,
            _count: {
              select: {
                keywords: true,
                audits: true,
                backlinks: true,
              },
            },
          },
        },
      },
    })
    return user
  }),

  // Update user profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        planType: z.enum(['STARTER', 'PROFESSIONAL', 'ENTERPRISE']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      })
      return user
    }),

  // Get user statistics
  getStats: publicProcedure.query(async ({ ctx }) => {
    // If no session, return demo stats
    if (!ctx.session?.user?.id) {
      return {
        projectCount: 0,
        keywordCount: 0,
        totalRankings: 0,
        avgPosition: 0,
      }
    }

    const userId = ctx.session.user.id

    const [projectCount, keywordCount, totalRankings] = await Promise.all([
      ctx.prisma.project.count({
        where: { userId },
      }),
      ctx.prisma.keyword.count({
        where: { project: { userId } },
      }),
      ctx.prisma.ranking.count({
        where: { keyword: { project: { userId } } },
      }),
    ])

    // Get average position for last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentRankings = await ctx.prisma.ranking.findMany({
      where: {
        keyword: { project: { userId } },
        date: { gte: thirtyDaysAgo },
      },
      select: { position: true },
    })

    const avgPosition = recentRankings.length > 0
      ? recentRankings.reduce((sum, r) => sum + r.position, 0) / recentRankings.length
      : 0

    return {
      projectCount,
      keywordCount,
      totalRankings,
      avgPosition: Math.round(avgPosition * 10) / 10,
    }
  }),
})
