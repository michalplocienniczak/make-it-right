'use client'
import React, { useState } from 'react'
import { Popconfirm, Table } from 'antd'
import { CldImage } from 'next-cloudinary'
import { TableProps } from 'antd/es/table'
import { ItemType } from '@prisma/client'
import btnStyles from '@/components/ButtonStyle.module.scss'
import { ItemTypesForm } from '.'
import { useGetItemTypesAction } from '@/hooks/itemTypes/useGetItemTypesAction'
import { useDeleteItemTypeAction } from '@/hooks/itemTypes/useDeleteItemTypesAction'
import '@/components/table.css'

const ItemTypesTable = () => {
  const [open, setOpen] = useState(false)
  const { data: itemTypes, refetch, isPending } = useGetItemTypesAction()
  const [editedItemType, setEditedItemType] = useState<ItemType | null>(null)
  const { mutate } = useDeleteItemTypeAction()

  const columns: TableProps<ItemType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      width: 200,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 75,
      render: (_, record) => (
        <CldImage
          src={record.image}
          alt="Item Type Image"
          width={50}
          height={50}
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
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 180,
      render: (_, record) => (
        <div className="flex place-items-center gap-2">
          <button
            className={btnStyles.mcButton}
            onClick={() => setEditedItemType(record)}
          >
            Edit
          </button>
          <Popconfirm
            title="Are you sure you want to delete this item type?"
            onConfirm={() =>
              mutate(record.id, {
                onSettled: () => refetch(),
              })
            }
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: btnStyles.mcButton,
            }}
            cancelButtonProps={{
              className: btnStyles.mcButton,
            }}
          >
            <button className={btnStyles.mcButton}>Delete</button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="flex place-items-center justify-between mb-8">
        <h1 className="text-xl">Item Types</h1>
        <button className={btnStyles.mcButton} onClick={() => setOpen(true)}>
          Add Item Type
        </button>
      </div>
      <ItemTypesForm
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => refetch()}
      />

      <ItemTypesForm
        open={!!editedItemType}
        onClose={() => setEditedItemType(null)}
        itemType={editedItemType || undefined}
        onSuccess={async () => await refetch()}
      />

      <Table dataSource={itemTypes} columns={columns} loading={isPending} />
    </>
  )
}

export default ItemTypesTable
