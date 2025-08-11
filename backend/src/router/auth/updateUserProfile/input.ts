import { z } from 'zod';

export const zUpdateTrpcInput = z.object({
    nick: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letter, numbers and dashes'),
    name: z.string().max(50).default('')

})