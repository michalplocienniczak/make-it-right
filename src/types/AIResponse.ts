export type AIResponse = {
  possibility: boolean
  comment: string
  advices: {
    name: string
    items: {
      name: string
      location: string
      necessary_quantity: number
    }[]
  }[]
}
