import { Location } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type UseDeleteLocationActionProps = {
  id: Location['id']
}

export const useDeleteLocationAction = ({
  id,
}: UseDeleteLocationActionProps) => {
  return useMutation({
    mutationFn: async () => {
      const repsonse = await axios.delete(`/api/locations/${id}`)

      return repsonse.data
    },
  })
}
