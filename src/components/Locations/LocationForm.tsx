'use client'
import { Location } from '@prisma/client'
import { Modal, Spin, Tooltip, notification } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { AppForm, AppInput, AppInputNumber } from '../AppComponents'
import btnStyles from '@/components/ButtonStyle.module.scss'
import { isEqual } from 'lodash'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { MdDelete } from 'react-icons/md'
import { usePatchLocationAction } from '@/hooks/locations/usePatchLocationAction'
import { usePostLocationAction } from '@/hooks/locations/usePostLocationAction'

type LocationFormProps = {
  open: boolean
  onClose: () => void
  location?: Location
  onSuccess?: () => void
}

const LocationForm = ({
  open,
  onClose,
  location,
  onSuccess,
}: LocationFormProps) => {
  const isEditMode = !!location

  const initialValues = isEditMode
    ? {
        name: location.name,
        x: location.x,
        y: location.y,
        z: location.z,
        image: location.image,
      }
    : {
        name: '',
        x: 0,
        y: 0,
        z: 0,
        image: null,
      }

  const title = isEditMode ? 'Save' : 'Add new Location'

  const { isPending, mutate: patch } = usePatchLocationAction({
    id: location?.id || '',
  })
  const { isPending: isPostPending, mutate: post } = usePostLocationAction()

  const handleSubmit = (values: Partial<Location>) => {
    console.log('values', values)
    if (isEditMode) {
      patch(
        {
          name: values.name,
          x: values.x!,
          y: values.y!,
          z: values.z!,
          image: values.image,
        },
        {
          onSuccess: () => {
            onSuccess?.()
            notification.success({
              message: 'Location updated successfully',
            })
            onClose()
          },
        }
      )
    } else {
      post(
        {
          name: values.name!,
          x: values.x!,
          y: values.y!,
          z: values.z!,
          image: values.image || null,
        },
        {
          onSuccess: () => {
            onSuccess?.()
            notification.success({
              message: 'Location created successfully',
            })
            onClose()
          },
          onError(error, variables, context) {
            console.log('error', error)
            console.log('variables', variables)
            console.log('context', context)
            notification.error({
              message: 'Error',
              description: error.message,
            })
          },
        }
      )
    }
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered={true}>
      <Formik<Pick<Location, 'image' | 'name' | 'x' | 'y' | 'z'>>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          const hasChanged = isEqual(initialValues, values)

          return (
            <Spin spinning={isPending || isPostPending}>
              <AppForm layout="vertical">
                <AppInput
                  name="name"
                  labelProps={{ label: 'Name' }}
                  placeholder="Enter Location name"
                />
                <div className="flex place-items-center gap-2">
                  <AppInputNumber
                    name="x"
                    labelProps={{ label: 'X' }}
                    placeholder="Enter X"
                  />
                  <AppInputNumber
                    name="y"
                    labelProps={{ label: 'Y' }}
                    placeholder="Enter Y"
                  />
                  <AppInputNumber
                    name="z"
                    labelProps={{ label: 'Z' }}
                    placeholder="Enter Z"
                  />
                </div>
                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  options={{
                    croppingAspectRatio: 1,
                  }}
                  onSuccess={(result) => {
                    if (typeof result.info !== 'string')
                      setFieldValue('image', result.info?.public_id)
                  }}
                >
                  {({ open }) =>
                    values.image ? (
                      <div className="flex place-items-center gap-2 mb-6">
                        <Tooltip title="Change image">
                          <CldImage
                            src={values.image}
                            alt="Location Image"
                            onClick={() => open()}
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
                            className="cursor-pointer"
                          />
                        </Tooltip>

                        <MdDelete
                          onClick={() => setFieldValue('image', null)}
                          size={25}
                          className="cursor-pointer"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={`${btnStyles.mcButton} mb-6`}
                        onClick={() => open()}
                      >
                        Upload Image
                      </button>
                    )
                  }
                </CldUploadWidget>
                <button
                  type="submit"
                  disabled={hasChanged}
                  className={btnStyles.mcButton}
                >
                  {title}
                </button>
              </AppForm>
            </Spin>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default LocationForm
