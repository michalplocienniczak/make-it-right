import { ItemType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostItemTypeAction = () => {
  return useMutation({
    mutationFn: async (itemType: Pick<ItemType, 'key' | 'name' | 'image'>) => {
      const response = await axios.post(`/api/itemtypes/`, itemType)

      return response.data
    },
  })
}
