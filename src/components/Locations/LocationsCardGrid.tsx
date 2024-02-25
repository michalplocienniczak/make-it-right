import { useGetLocationsAction } from '@/hooks/locations/useGetLocationsAction'
import React from 'react'
import gridStyles from './LocationsCardGrid.module.scss'
import LocationsCard from './LocationsCard'
import { Location } from '@prisma/client'

type LocationsCardGridProps = {
  locations: Location[]
}

const LocationsCardGrid = ({ locations }: LocationsCardGridProps) => {
  return (
    <div className={gridStyles.grid}>
      {locations?.map((location: Location) => (
        <LocationsCard key={location.id} location={location} />
      ))}
    </div>
  )
}

export default LocationsCardGrid
