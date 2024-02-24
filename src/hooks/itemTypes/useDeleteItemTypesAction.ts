import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteItemTypeAction = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/itemtypes/${id}`)

      return response.data
    },
  })
}
