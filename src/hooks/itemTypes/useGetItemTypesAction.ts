import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetItemTypesAction = () => {
  return useQuery({
    queryKey: ['itemTypes'],
    queryFn: async () => {
      const response = await axios.get(`/api/itemtypes/`)
      return response.data
    },
  })
}
