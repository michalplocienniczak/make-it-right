import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostAddItemsAction = ({ id }: { id: string }) => {
  return useMutation({
    mutationFn: async (payload: { typeId: string; quantity: number }) => {
      try {
        const response = await axios.post(
          `/api/locations/${id}/items/add`,
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
