import { useAICraftingAction } from '@/hooks/ai/useAICraftingAction'
import React from 'react'
import '@/components/Locations/locationCard.css'
import { AIResponse } from '@/types/AIResponse'
import { Card } from 'antd'
import { useGetItemTypesAction } from '@/hooks/itemTypes/useGetItemTypesAction'
import { useGetLocationsAction } from '@/hooks/locations/useGetLocationsAction'
import { ItemType, Location } from '@prisma/client'
import { CldImage } from 'next-cloudinary'

const AICrafting = () => {
  const { data, isPending } = useAICraftingAction()
  const { data: itemTypes } = useGetItemTypesAction()
  const { data: locations } = useGetLocationsAction()

  const crafting = data as AIResponse

  if (isPending) return <div>Loading AI generated craftings...</div>

  const getType = (type: string) => {
    const itemType = itemTypes?.find(
      (itemType: ItemType) => itemType.key === type
    )
    return itemType
  }

  const getLocation = (location: string) => {
    const locationItem = locations?.find(
      (locationItem: Location) => locationItem.id === location
    )
    return locationItem
  }

  return (
    <section className="mt-6">
      <h1 className="mb-6">AI Generated Craftings</h1>
      <div className="flex flex-col gap-2 mb-6">
        {crafting?.advices.map((advice) => (
          <Card key={advice.name}>
            <h2>{advice.name}</h2>
            <h3>Required items:</h3>
            <ul>
              {advice.items.map((item) => {
                const type = getType(item.name)
                const location = getLocation(item.location)
                return (
                  <li key={item.name}>
                    <div className="whitespace-nowrap flex place-items-center gap-2">
                      <CldImage
                        src={type.image}
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
                      />{' '}
                      <p>x {item.necessary_quantity}</p>
                    </div>{' '}
                    from location &quot;
                    {location.name}&quot;
                  </li>
                )
              })}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default AICrafting
