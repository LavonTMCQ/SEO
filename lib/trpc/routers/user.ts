import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'

export const userRouter = router({
  // Get current user profile
  getProfile: publicProcedure.query(async ({ ctx }) => {
    // Return mock user for initial deployment
    return {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      planType: 'STARTER',
      projects: [],
    }
  }),

  // Update user profile
  updateProfile: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        planType: z.enum(['STARTER', 'PROFESSIONAL', 'ENTERPRISE']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Return mock update for initial deployment
      return {
        id: 'demo-user',
        name: input.name || 'Demo User',
        email: 'demo@example.com',
        planType: input.planType || 'STARTER',
      }
    }),

  // Get user statistics
  getStats: publicProcedure.query(async ({ ctx }) => {
    // Return demo stats for initial deployment
    return {
      projectCount: 3,
      keywordCount: 25,
      totalRankings: 150,
      avgPosition: 12.5,
    }
  }),
})
