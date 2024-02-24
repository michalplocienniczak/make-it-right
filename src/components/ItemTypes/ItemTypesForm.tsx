'use client'
import { ItemType } from '@prisma/client'
import { Modal, Spin, Tooltip, notification } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { AppForm, AppInput } from '../AppComponents'
import btnStyles from '@/components/ButtonStyle.module.scss'
import { isEqual } from 'lodash'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { usePatchItemTypeAction } from '@/hooks/itemTypes/usePatchItemTypeAction'
import { usePostItemTypeAction } from '@/hooks/itemTypes/usePostItemTypeAction'

type ItemTypesFormProps = {
  open: boolean
  onClose: () => void
  itemType?: ItemType
  onSuccess?: () => void
}

const ItemTypesForm = ({
  open,
  onClose,
  itemType,
  onSuccess,
}: ItemTypesFormProps) => {
  const isEditMode = !!itemType

  const initialValues = isEditMode
    ? {
        name: itemType.name,
        key: itemType.key,
        image: itemType.image,
      }
    : {
        name: '',
        key: '',
        image: null,
      }

  const title = isEditMode ? 'Edit Item Type' : 'Add Item Type'

  const { isPending, mutate: patch } = usePatchItemTypeAction({
    id: itemType?.id || '',
  })
  const { isPending: isPostPending, mutate: post } = usePostItemTypeAction()

  const handleSubmit = (
    values: Pick<ItemType, 'name' | 'key'> & {
      image: string | null
    }
  ) => {
    if (isEditMode) {
      patch(
        {
          name: values.name,
          key: values.key,
          image: values.image!,
        },
        {
          onSettled: () => {
            onSuccess?.()
            notification.success({
              message: 'Item Type updated successfully',
            })
            onClose()
          },
        }
      )
    } else {
      post(
        {
          name: values.name,
          key: values.key,
          image: values.image!,
        },
        {
          onSettled: () => {
            onSuccess?.()
            notification.success({
              message: 'Item Type created successfully',
            })
            onClose()
          },
        }
      )
    }
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered={true}>
      <Formik<
        Pick<ItemType, 'name' | 'key'> & {
          image: string | null
        }
      >
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          const hasChanged = isEqual(initialValues, values)
          const hasAllValues = values.name && values.key && values.image

          return (
            <Spin spinning={isPending || isPostPending}>
              <AppForm layout="vertical">
                <AppInput
                  name="name"
                  labelProps={{ label: 'Name' }}
                  placeholder="Enter Item Type name"
                />
                <AppInput
                  name="key"
                  labelProps={{ label: 'Key' }}
                  placeholder="Enter Item Type key"
                  onChange={(e) => {
                    setFieldValue('key', e.target.value.toLowerCase())
                  }}
                />
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
                      <Tooltip title="Change image">
                        <CldImage
                          src={values.image}
                          alt="Item Type Image"
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
                          className="mb-6 cursor-pointer"
                        />
                      </Tooltip>
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
                  disabled={hasChanged || !hasAllValues}
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

export default ItemTypesForm
