import { Location } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostLocationAction = () => {
  return useMutation({
    mutationFn: async (
      location: Pick<Location, 'image' | 'name' | 'x' | 'y' | 'z'>
    ) => {
      try {
        const response = await axios.post(`/api/locations/`, location)
        return response.data
      } catch (error) {
        console.error(error)
        throw new Error('Error posting location.')
      }
    },
  })
}
