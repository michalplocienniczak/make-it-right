import { z } from 'zod'

export const postLoactionTypeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  image: z.string().optional(),
})

export const patchLocationTypeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  z: z.number().optional(),
  image: z.string().optional(),
})

export const changeQuantitySchema = z.object({
  quantity: z.number(),
  typeId: z.string(),
})
