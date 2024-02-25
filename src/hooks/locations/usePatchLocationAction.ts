import { Location } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type UsePatchLocationActionProps = {
  id: Location['id']
}

export const usePatchLocationAction = ({ id }: UsePatchLocationActionProps) => {
  return useMutation({
    mutationFn: async (itemType: Partial<Location>) => {
      const repsonse = await axios.patch(`/api/locations/${id}`, itemType)

      return repsonse.data
    },
  })
}
