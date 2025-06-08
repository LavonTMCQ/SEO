import { router } from './trpc'
import { userRouter } from './routers/user'
import { projectRouter } from './routers/project'

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
})

export type AppRouter = typeof appRouter
