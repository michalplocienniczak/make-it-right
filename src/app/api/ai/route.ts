import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import OpenAI from 'openai'
import { craftingPrompt } from '@/prompts/craftingPrompt'
import prisma from '@@/prisma/client'

const openai = new OpenAI()

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

const responseSchema = z.object({
  possibility: z.boolean(),
  comment: z.string(),
  advices: z.array(
    z.object({
      name: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          location: z.string(),
          necessary_quantity: z.number(),
        })
      ),
    })
  ),
})

export async function GET(request: NextRequest) {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      locationId: true,
      typeId: true,
      quantity: true,
    },
  })

  const itemTypes = await prisma.itemType.findMany({
    select: {
      id: true,
      key: true,
    },
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: craftingPrompt(
          JSON.stringify(items),
          JSON.stringify(itemTypes)
        ),
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const parsedResponse = JSON.parse(response.choices[0].message.content || '')

  console.log(parsedResponse)

  const validationResponse = responseSchema.safeParse(parsedResponse)

  if (!validationResponse.success) {
    return NextResponse.json(validationResponse.error.format(), { status: 500 })
  }

  return NextResponse.json(parsedResponse, { status: 200 })
}
