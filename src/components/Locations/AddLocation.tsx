import React, { useState } from 'react'
import btnStyles from '@/components/ButtonStyle.module.scss'
import LocationForm from './LocationForm'

type AddLocationProps = {
  onSuccess?: () => void
}

const AddLocation = ({ onSuccess }: AddLocationProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <LocationForm
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
      <div className={btnStyles.mcButton} onClick={() => setOpen(true)}>
        Add New Location
      </div>
    </>
  )
}

export default AddLocation
