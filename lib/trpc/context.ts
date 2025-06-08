import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth'
import { prisma } from '../prisma'

export async function createTRPCContext(opts: FetchCreateContextFnOptions) {
  // Get the session from the server - handle App Router context
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.log('Session error (expected in some contexts):', error?.message || 'Unknown error')
  }

  return {
    session,
    prisma,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
