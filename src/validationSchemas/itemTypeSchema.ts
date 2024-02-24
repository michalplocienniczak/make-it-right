import { z } from 'zod'

export const itemTypePostSchema = z.object({
  name: z.string(),
  key: z.string(),
  image: z.string(),
})

export const itemTypePatchSchema = z.object({
  name: z.string().optional(),
  key: z.string().optional(),
  image: z.string().optional(),
})
