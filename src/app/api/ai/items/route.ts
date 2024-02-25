import { NextRequest, NextResponse } from 'next/server'
import prisma from '@@/prisma/client'

export async function GET(request: NextRequest) {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      locationId: true,
      typeId: true,
      quantity: true,
    },
  })

  return NextResponse.json(items, { status: 200 })
}
