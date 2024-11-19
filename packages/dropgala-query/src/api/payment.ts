import { Payment } from '@dropgala/types/generated/payment/Payment'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL, serializeNestedBuffers } from '@dropgala/utils/utils'
import paymentCacheStore from '@store/payment.store'

export const fetchAvailablePayments = async (alias: string) => {
  let paymentsObject = { payments: [] } as { payments: Payment[] }
  // paymentsObject = await paymentCacheStore.getPayments(alias)
  if (isEmpty(paymentsObject?.payments)) {
    const response = await fetch(`${apiURL}/resources/payments`, {
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
    paymentsObject = await response.json()
  }
  const payments = paymentsObject?.payments
  return payments?.map((payment) => serializeNestedBuffers(payment))
}
