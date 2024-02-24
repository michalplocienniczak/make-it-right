import { itemTypePostSchema } from '@/validationSchemas/itemTypeSchema'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@@/prisma/client'

export async function GET(request: NextRequest) {
  const itemTypes = await prisma.itemType.findMany()

  return NextResponse.json(itemTypes, { status: 200 })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = itemTypePostSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const itemType = await prisma.itemType.findFirst({
    where: {
      OR: [{ name: body.name }, { key: body.key }],
    },
  })

  if (!!itemType) {
    return NextResponse.json('Item type already exists', { status: 400 })
  }

  const newItemType = await prisma.itemType.create({
    data: {
      name: body.name,
      key: body.key,
      image: body.image,
    },
  })

  return NextResponse.json(newItemType, { status: 201 })
}
