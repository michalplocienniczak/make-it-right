import { changeQuantitySchema } from '@/validationSchemas/locationTypeSchema'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@@/prisma/client'

export async function POST(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const location = await prisma.location.findFirst({
    where: {
      id,
    },
    include: {
      items: true,
    },
  })

  if (!location) {
    return NextResponse.json('Location not found', { status: 404 })
  }

  const body = await request.json()

  const validation = changeQuantitySchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const item = location.items.find((item) => item.typeId === body.typeId)

  if (item) {
    const updatedItem = await prisma.item.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: item.quantity + body.quantity,
      },
    })

    return NextResponse.json(updatedItem, { status: 201 })
  }

  const newItem = await prisma.item.create({
    data: {
      locationId: id,
      typeId: body.typeId,
      quantity: body.quantity,
    },
  })

  return NextResponse.json(newItem, { status: 201 })
}
