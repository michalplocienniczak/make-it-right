import { Location } from '@prisma/client'
import { Card } from 'antd'
import { CldImage } from 'next-cloudinary'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './locationCard.css'

type LocationsCardProps = {
  location: Location
}

const LocationsCard = ({ location }: LocationsCardProps) => {
  return (
    <Link href={`/locations/${location.id}`}>
      <Card>
        <div className="flex w-full place-items-start gap-3">
          {location.image ? (
            <CldImage
              src={location.image}
              alt="Location Image"
              width={100}
              height={100}
              config={{
                url: {
                  queryParams: {
                    q: 'auto',
                    f: 'auto',
                    fl: 'lossy',
                  },
                },
              }}
            />
          ) : (
            <Image
              src="/default-location-pic.webp"
              alt="Location Image"
              width={100}
              height={100}
            />
          )}
          <div className="flex flex-col gap-2">
            <h2>{location.name}</h2>
            <p>
              x: {location.x}, y: {location.y}, z: {location.z}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default LocationsCard
