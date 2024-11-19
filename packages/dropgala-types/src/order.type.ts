export interface OrderType {
  items: {
    id: string
    orderQuantity: number
    orderVariationOption: { id: string }
  }[]
  clientSecret?: string | null
  paymentIntent?: string | null
}
