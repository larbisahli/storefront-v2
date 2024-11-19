const PayPalPaymentOption = ({ selectedPaymentMethod, id }: PayProps) => {
  return (
    <div className="bg-gray-100 w-full border-b-0 last:border-b relative shadow border border-gray-300">
      <div className="px-3 py-4">
        <div className="text-sm ml-8 text-gray text-gray-900">
          <span>PayPal</span>
        </div>
        {selectedPaymentMethod?.id === id && <div>HELLO</div>}
      </div>
    </div>
  )
}

export default PayPalPaymentOption
