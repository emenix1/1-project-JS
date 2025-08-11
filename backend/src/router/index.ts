import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpc } from "../lib/trpc";
 // @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
 import { createIdeaTrpcRoute } from './ideas/createIdea'
 import { getIdeaTrpcRoute } from './ideas/getIdea'
 import { getIdeasTrpcRoute } from './ideas/getIdeas'
 import { getMeTrpcRoute } from './auth/getMe'
 import { signInTrpcRoute } from './auth/signIn'
 import { signUpTrpcRoute } from './auth/signUp'
 import { updateIdeaTrpcRoute } from './ideas/updateIdea'
 // @endindex

export const trpcRouter = trpc.router({
 // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
 createIdea: createIdeaTrpcRoute,
 getIdea: getIdeaTrpcRoute,
 getIdeas: getIdeasTrpcRoute,
 getMe: getMeTrpcRoute,
 signIn: signInTrpcRoute,
 signUp: signUpTrpcRoute,
 updateIdea: updateIdeaTrpcRoute,
 // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>    