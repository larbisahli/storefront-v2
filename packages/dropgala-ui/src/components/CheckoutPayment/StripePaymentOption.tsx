import { CheckoutFormValues } from '@dropgala/types'

interface PayProps {
  selectedPaymentMethod: CheckoutFormValues['paymentMethod']
  id: string
}

const StripePaymentOption = ({ selectedPaymentMethod, id }: PayProps) => {
  return (
    <div className="bg-gray-100 w-full border-b-0 last:border-b relative shadow border border-gray-300">
      <div className="px-3 py-4">
        <div className="text-sm ml-8 text-gray text-gray-900">
          <span>Credit/ Debit Card</span>
        </div>
        {selectedPaymentMethod?.id === id && (
          <div className="bg-gray-100 h-[200px]">
            {/* <PaymentElement /> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default StripePaymentOption
