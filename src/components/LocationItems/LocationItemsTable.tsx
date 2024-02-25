import { Item, ItemType } from '@prisma/client'
import { Table, TableProps } from 'antd'
import { CldImage } from 'next-cloudinary'
import React from 'react'
import '@/components/table.css'

type IcludedItemType = Item & {
  type: ItemType
}

type LocationItemsTableProps = {
  items: IcludedItemType[]
  loading: boolean
}

const LocationItemsTable = ({ items, loading }: LocationItemsTableProps) => {
  const columns: TableProps<IcludedItemType>['columns'] = [
    {
      title: 'Img',
      dataIndex: 'image',
      key: 'image',
      width: 75,
      render: (_, record) => (
        <CldImage
          src={record.type.image}
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (_, record) => record.type.name,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 75,
    },
  ]

  return <Table dataSource={items} columns={columns} loading={loading} />
}

export default LocationItemsTable
