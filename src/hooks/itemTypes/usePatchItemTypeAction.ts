import { ItemType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type UsePatchItemTypeActionProps = {
  id: ItemType['id']
}

export const usePatchItemTypeAction = ({ id }: UsePatchItemTypeActionProps) => {
  return useMutation({
    mutationFn: async (itemType: Partial<ItemType>) => {
      const repsonse = await axios.patch(`/api/itemtypes/${id}`, itemType)

      return repsonse.data
    },
  })
}
