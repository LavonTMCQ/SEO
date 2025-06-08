import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../app/api/auth/[...nextauth]/route'
import { prisma } from '../prisma'

export async function createTRPCContext(opts: CreateNextContextOptions) {
  const { req, res } = opts

  // Get the session from the server - handle both API routes and App Router
  let session = null
  try {
    if (req && res) {
      session = await getServerSession(req, res, authOptions)
    }
  } catch (error) {
    console.log('Session error (expected in some contexts):', error.message)
  }

  return {
    session,
    prisma,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
