import { trpc } from '../../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
        throw new Error('Permission denied') 
    }
    const existingIdea = await ctx.prisma.idea.findUnique({
        where: {
            nick: input.nick,
        },
    })
    if (existingIdea) {
        throw new Error('Idea with this name already exists')
    }
    await ctx.prisma.idea.create({
        data: {...input, authorId : ctx.me.id},
    })
    return true
})
