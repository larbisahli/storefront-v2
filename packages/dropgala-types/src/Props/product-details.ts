import { CartItemType } from 'checkout.type'
import { ProductType } from 'product.type'

export interface ProductDetailsProps {
  product: ProductType
  cartItems: CartItemType[]
  addToCart: () => void
  selectedQuantity: number
  // setSelectedQuantity: Dispatch<SetStateAction<number>>
}
