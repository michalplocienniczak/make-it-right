import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetLocationsAction = ({ token }: { token: string }) => {
  return useQuery({
    queryKey: ['locations', token],
    queryFn: async () => {
      const response = await axios.get(`/api/locations/`)
      return response.data
    },
  })
}
