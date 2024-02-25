import React from 'react'
import { useState } from 'react'
import btnStyles from '@/components/ButtonStyle.module.scss'
import { Modal, Spin, notification } from 'antd'
import { Formik } from 'formik'
import { AppForm, AppInputNumber, AppSelect } from '../AppComponents'
import { useGetItemTypesAction } from '@/hooks/itemTypes/useGetItemTypesAction'
import { CldImage } from 'next-cloudinary'
import { Item, ItemType } from '@prisma/client'
import { usePostAddItemsAction } from '@/hooks/locationItems/usePostAddItemsAction'
import { usePostSubstractItemsAction } from '@/hooks/locationItems/usePostSubstractItemsAction'

type ChangeButtonProps = {
  onSuccess: () => void
  id: string
  isAdd?: boolean
  location: Location & { items: Item[] }
}

type QuantityChage = {
  quantity: number
  typeId: string
}

const ChangeButton = ({
  isAdd = false,
  onSuccess,
  id,
  location,
}: ChangeButtonProps) => {
  const [open, setOpen] = useState(false)

  const { data: itemTypes } = useGetItemTypesAction()

  const { mutate: add } = usePostAddItemsAction({ id })
  const { mutate: remove } = usePostSubstractItemsAction({ id })

  const locationItemsIds = location?.items.map((item) => item.typeId)

  const selectedItemTypes = isAdd
    ? itemTypes
    : itemTypes?.filter((item: ItemType) => locationItemsIds?.includes(item.id))

  const options = selectedItemTypes?.map((item: ItemType) => {
    return {
      label: (
        <div className="flex place-items-center gap-1">
          <CldImage
            src={item.image}
            alt="Item Type Image"
            width={20}
            height={20}
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
          <p>{item.name}</p>
        </div>
      ),
      value: item.id,
    }
  })

  const handleSubmit = (values: QuantityChage) => {
    if (isAdd) {
      add(values, {
        onSuccess: () => {
          notification.success({
            message: 'Items added to inventory',
          })
          onSuccess()
        },
      })
    } else {
      remove(values, {
        onSuccess: () => {
          notification.success({
            message: 'Items added to inventory',
          })
          onSuccess()
        },
      })
    }
    setOpen(false)
  }

  const getMin = (typeId: string) => {
    const item = location.items.find((item) => item.typeId === typeId)
    return item?.quantity || 0
  }

  const title = isAdd ? 'Add' : 'Remove'

  return (
    <>
      <div className={btnStyles.mcButton} onClick={() => setOpen(true)}>
        {isAdd ? 'Add Items to Inventory' : 'Remove Items from Inventory'}
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered={true}
        title={isAdd ? 'Add Items to Inventory' : 'Remove Items from Inventory'}
      >
        <Formik<QuantityChage>
          initialValues={{
            quantity: 1,
            typeId: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            const hasAllFields = values.quantity && values.typeId

            return (
              <Spin spinning={false}>
                <AppForm layout="vertical">
                  <AppSelect
                    name="typeId"
                    options={options}
                    labelProps={{
                      label: 'Item Type',
                    }}
                  />
                  <AppInputNumber
                    name="quantity"
                    labelProps={{ label: 'Quantity' }}
                    placeholder="Enter Quantity"
                    min={1}
                    max={isAdd ? undefined : getMin(values.typeId)}
                  />
                  <button
                    type="submit"
                    className={btnStyles.mcButton}
                    disabled={!hasAllFields}
                  >
                    {title}
                  </button>
                </AppForm>
              </Spin>
            )
          }}
        </Formik>
      </Modal>
    </>
  )
}

export default ChangeButton
