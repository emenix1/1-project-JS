import crypto from 'crypto'
import { trpc } from '../../../lib/trpc'
import { zSignUpTrpcInput } from './input'
import { signJWT } from '../../../utils/signJWT'
import { getPasswordHash } from '../../../utils/getPasswordHash'


export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  console.log(getPasswordHash)
  const existingUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (existingUser) {
    throw new Error('User with this nick already exists')
  }
  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })
  const token = signJWT(user.id)
  return { token }
})