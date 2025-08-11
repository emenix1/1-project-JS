import z from "zod";

export const zCreateIdeaTrpcInput =  z.object({
        name: z.string().min(1, 'Name is required'),
        nick: z.string().min(1, 'Nick is required').regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
        description: z.string().min(1, 'Description is required'),
        text: z.string().min(50, 'Text should be at least 50 characters long'),
      })