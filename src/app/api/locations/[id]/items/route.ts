import { NextRequest, NextResponse } from 'next/server'
import prisma from '@@/prisma/client'

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const location = await prisma.location.findFirst({
    where: {
      id,
    },
  })

  if (!location) {
    return NextResponse.json('Location not found', { status: 404 })
  }

  const items = await prisma.item.findMany({
    where: {
      locationId: id,
    },
  })

  return NextResponse.json(items, { status: 200 })
}
