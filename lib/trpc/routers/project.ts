import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'

export const projectRouter = router({
  // Get all user projects
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Return demo projects for initial deployment
    return [
      {
        id: 'demo-project-1',
        name: 'My Website',
        domain: 'https://example.com',
        userId: 'demo-user',
        settings: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: {
          keywords: 10,
          audits: 2,
          backlinks: 45,
        },
        avgPosition: 8.5,
      },
      {
        id: 'demo-project-2',
        name: 'E-commerce Store',
        domain: 'https://shop.example.com',
        userId: 'demo-user',
        settings: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: {
          keywords: 15,
          audits: 3,
          backlinks: 78,
        },
        avgPosition: 12.3,
      },
    ]
  }),

  // Get single project by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Return mock project for initial deployment
      return {
        id: input.id,
        name: 'Demo Project',
        domain: 'https://example.com',
        userId: 'demo-user',
        settings: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        keywords: [],
        audits: [],
        backlinks: [],
      }
    }),

  // Create new project
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Project name is required'),
        domain: z.string().url('Please enter a valid domain URL'),
        settings: z.object({}).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Return mock project for initial deployment
      return {
        id: `demo-project-${Date.now()}`,
        name: input.name,
        domain: input.domain,
        userId: 'demo-user',
        settings: input.settings || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

  // Update project
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        domain: z.string().url().optional(),
        settings: z.object({}).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Return mock update for initial deployment
      return {
        id: input.id,
        name: input.name || 'Updated Project',
        domain: input.domain || 'https://example.com',
        userId: 'demo-user',
        settings: input.settings || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

  // Delete project
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Return mock delete for initial deployment
      return { success: true }
    }),
})
