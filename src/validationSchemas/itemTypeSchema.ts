import { z } from 'zod'

export const itemTypePostSchema = z.object({
  name: z.string(),
  key: z.string().toLowerCase(),
  image: z.string(),
})

export const itemTypePatchSchema = z.object({
  name: z.string().optional(),
  key: z.string().toLowerCase().optional(),
  image: z.string().optional(),
})
