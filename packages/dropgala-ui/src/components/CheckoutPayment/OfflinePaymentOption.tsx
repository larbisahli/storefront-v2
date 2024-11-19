import { PaymentTypes } from '@dropgala/types'

interface PayProps {
  payment: PaymentTypes
  selectedOptionId: string | null
}

const OfflinePaymentOption = ({ selectedOptionId, payment }: PayProps) => {
  return (
    <div className="bg-gray-100 w-full border-b-0 last:border-b relative shadow border border-gray-300">
      <div className="px-8 py-4">
        <div className="text-base font-medium text-gray text-gray-900">
          <span>{payment?.data?.name}</span>
        </div>
        {selectedOptionId === payment.id && <div className=""></div>}
      </div>
    </div>
  )
}

export default OfflinePaymentOption
