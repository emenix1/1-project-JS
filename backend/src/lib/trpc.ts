import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type TrpcRouter } from '../router'
import { AppContext } from './ctx'
import superjson from 'superjson'
import { ExpressRequest } from '../utils/types'


const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null,
  })
  type TrpcContext = Awaited<ReturnType<typeof getCreateTrpcContext>>

 export const trpc = initTRPC.context<TrpcContext>().create({transformer: superjson} )

 export const applyTrpcToExpress = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
    expressApp.use(
    
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext: getCreateTrpcContext(appContext),
      })
    )
}