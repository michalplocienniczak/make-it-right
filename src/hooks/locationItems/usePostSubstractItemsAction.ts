import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostSubstractItemsAction = ({ id }: { id: string }) => {
  return useMutation({
    mutationFn: async (payload: { typeId: string; quantity: number }) => {
      try {
        const response = await axios.post(
          `/api/locations/${id}/items/substract`,
          payload
        )
        return response.data
      } catch (error) {
        console.error(error)
        throw new Error('Error posting items to locaion.')
      }
    },
  })
}
