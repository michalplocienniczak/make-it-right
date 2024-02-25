import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const aiPayloadSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      locationId: z.string(),
      typeId: z.string(),
      quantity: z.number(),
    })
  ),
  itemTypes: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
    })
  ),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = aiPayloadSchema.safeParse(body)

  if (!validation.success) {
    NextResponse.json(validation.error.format(), { status: 400 })
  }
}
