import { z } from 'zod'

export const querySchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  completed: z.boolean().optional(),
})

export const uuidSchema = z.string().uuid()
