'use client'
import authOptions from '@/auth/authOptions'
import { getServerSession } from 'next-auth'
import styles from './Page.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import AddLocation from '@/components/Locations/AddLocation'
import LocationsCardGrid from '@/components/Locations/LocationsCardGrid'
import { useGetLocationsAction } from '@/hooks/locations/useGetLocationsAction'

export default function Home() {
  const { status } = useSession()
  const { data, refetch } = useGetLocationsAction()

  console.log(data)

  if (status === 'loading')
    return <div className="w-full py-3 text-center">Loading...</div>

  if (status === 'unauthenticated')
    return (
      <div>
        <div className={styles.imageContainer}>
          <Image
            src="/steventory-text.png"
            alt="Steventory"
            layout="fill"
            objectFit="contain"
            className={styles.textImage}
          />
        </div>
        <div className={styles.container}>
          <h1 className={styles.miniHeader}>
            Streamline Your Minecraft Mastery with Steventory:
          </h1>
          <p className={styles.header}>
            Where Every Steve Finds Their Treasure!
          </p>
        </div>

        <p className={styles.bottomLeft}>Steventory 1.21.37</p>
        <p className={styles.bottomRight}>Copyright make-it-right.</p>
      </div>
    )

  return (
    <>
      <div className="flex place-items-center justify-between my-3">
        <h1>Hello Steve&apos;s Friend!</h1>
        <AddLocation onSuccess={() => refetch()} />
      </div>
      <LocationsCardGrid locations={data} />
    </>
  )
}
