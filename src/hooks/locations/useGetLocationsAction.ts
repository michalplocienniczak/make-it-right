import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetLocationsAction = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await axios.get(`/api/locations/`)
      return response.data
    },
  })
}
