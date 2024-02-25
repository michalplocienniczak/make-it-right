import { NextRequest, NextResponse } from 'next/server'
import prisma from '@@/prisma/client'
import { postLoactionTypeSchema } from '@/validationSchemas/locationTypeSchema'

export async function GET(request: NextRequest) {
  const locations = await prisma.location.findMany()

  return NextResponse.json(locations, { status: 200 })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = postLoactionTypeSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newLocation = await prisma.location.create({
    data: {
      name: body.name,
      image: body.image,
      x: body.x,
      y: body.y,
      z: body.z,
    },
  })

  return NextResponse.json(newLocation, { status: 201 })
}
