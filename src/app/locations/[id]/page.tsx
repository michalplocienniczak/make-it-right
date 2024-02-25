'use client'
import AddLocation from '@/components/Locations/AddLocation'
import LocationsCard from '@/components/Locations/LocationsCard'
import { useDeleteLocationAction } from '@/hooks/locations/useDeleteLocationAction'
import { useGetSingleLocationsAction } from '@/hooks/locations/useGetSingleLocationsAction'
import btnStyles from '@/components/ButtonStyle.module.scss'
import React from 'react'
import { Popconfirm } from 'antd'
import { useRouter } from 'next/navigation'
import ChangeButton from '@/components/LocationItems/ChangeButton'
import { useGetLocationItemsAction } from '@/hooks/locationItems/useGetLocationItemsAction'
import LocationItemsTable from '@/components/LocationItems/LocationItemsTable'

const LocationPage = ({ params: { id } }: { params: { id: string } }) => {
  const { data, refetch } = useGetSingleLocationsAction({ id })
  const { mutate: deleteLocation } = useDeleteLocationAction({ id })
  const {
    data: items,
    refetch: refetchItems,
    isPending,
  } = useGetLocationItemsAction({
    id,
  })

  const router = useRouter()

  return (
    <>
      <section className="flex place-items-start justify-between">
        <LocationsCard location={data} />
        <div className="flex place-items-end justify-end flex-col">
          <AddLocation location={data} onSuccess={() => refetch()} />
          <Popconfirm
            title="Are you sure you want to delete this location?"
            onConfirm={() =>
              deleteLocation(undefined, {
                onSuccess: () => {
                  router.push('/')
                },
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
            <div className={btnStyles.mcButton}>Delete Location</div>
          </Popconfirm>
        </div>
      </section>
      <section className="mb-6">
        <div className="flex place-items-center justify-between">
          <h2>Manage items within location inventory</h2>
          <div className="flex place-items-end justify-end gap-2 flex-col">
            <ChangeButton isAdd id={id} onSuccess={() => refetchItems()} />
            <ChangeButton id={id} onSuccess={() => refetchItems()} />
          </div>
        </div>
      </section>
      <LocationItemsTable items={items} loading={isPending} />
    </>
  )
}

export default LocationPage
