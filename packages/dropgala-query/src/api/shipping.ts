import { Shipping } from '@dropgala/types/generated/shipping/Shipping'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL } from '@dropgala/utils/utils'
import shippingCacheStore from '@store/shipping.store'

export const fetchAvailableShippings = async (alias: string) => {
  let shippingsObject = { shippings: [] } as { shippings: Shipping[] }
  // shippingsObject = await shippingCacheStore.getShippings(alias)

  if (isEmpty(shippingsObject?.shippings)) {
    const response = await fetch(`${apiURL}/resources/shippings`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alias })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< shippings Error >>', error)
      throw { message: error.message }
    }
    shippingsObject = await response.json()
  }

  return shippingsObject?.shippings
}
