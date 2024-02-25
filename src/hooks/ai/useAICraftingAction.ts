import { AIResponse } from '@/types/AIResponse'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useAICraftingAction = () => {
  return useQuery({
    queryKey: ['aiCrafting'],
    queryFn: async () => {
      const response = await axios.get(`/api/ai/`)
      return response.data as AIResponse
    },
  })
}
