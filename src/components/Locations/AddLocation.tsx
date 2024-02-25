import React, { useState } from 'react'
import btnStyles from '@/components/ButtonStyle.module.scss'
import LocationForm from './LocationForm'
import { Location } from '@prisma/client'

type AddLocationProps = {
  location?: Location
  onSuccess?: () => void
}

const AddLocation = ({ onSuccess, location }: AddLocationProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <LocationForm
        open={open}
        onClose={() => setOpen(false)}
        location={location}
        onSuccess={onSuccess}
      />
      <div className={btnStyles.mcButton} onClick={() => setOpen(true)}>
        {location ? 'Edit Location' : 'Add New Location'}
      </div>
    </>
  )
}

export default AddLocation
