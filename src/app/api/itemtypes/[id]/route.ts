import { itemTypePatchSchema } from '@/validationSchemas/itemTypeSchema'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@@/prisma/client'

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json()

  const validation = itemTypePatchSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const itemType = await prisma.itemType.findFirst({
    where: {
      id,
    },
  })

  if (!itemType) {
    return NextResponse.json('Item type not found', { status: 404 })
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

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const itemType = await prisma.itemType.findFirst({
    where: {
      id,
    },
  })

  if (!itemType) {
    return NextResponse.json('Item type not found', { status: 404 })
  }

  await prisma.itemType.delete({
    where: {
      id,
    },
  })

  return NextResponse.json(null, { status: 204 })
}
