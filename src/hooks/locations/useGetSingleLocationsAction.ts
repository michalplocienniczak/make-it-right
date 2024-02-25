import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetSingleLocationsAction = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['locations', id],
    queryFn: async () => {
      const response = await axios.get(`/api/locations/${id}`)
      return response.data
    },
  })
}
