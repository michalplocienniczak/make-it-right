import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetLocationItemsAction = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['locationsItems'],
    queryFn: async () => {
      const response = await axios.get(`/api/locations/${id}/items`)
      return response.data
    },
  })
}
