import { NextRequest, NextResponse } from 'next/server'
import prisma from '@@/prisma/client'
import { patchLocationTypeSchema } from '@/validationSchemas/locationTypeSchema'

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json()

  const validation = patchLocationTypeSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const location = await prisma.location.findFirst({
    where: {
      id,
    },
  })

  if (!location) {
    return NextResponse.json('Location not found', { status: 404 })
  }

  const updatedLocation = await prisma.location.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      x: body.x,
      y: body.y,
      z: body.z,
      image: body.image,
    },
  })

  return NextResponse.json(updatedLocation, { status: 201 })
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const location = await prisma.location.findFirst({
    where: {
      id,
    },
  })

  if (!location) {
    return NextResponse.json('location not found', { status: 404 })
  }

  await prisma.location.delete({
    where: {
      id,
    },
  })

  return NextResponse.json(null, { status: 204 })
}

export async function GET(
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

  return NextResponse.json(location, { status: 200 })
}
