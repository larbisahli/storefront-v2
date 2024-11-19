import { useMemo } from 'react'

export function usePrice({
  amount,
  currencyCode = 'USD',
  locale = 'en-US'
}: {
  amount: number
  currencyCode: string | undefined
  locale: string
}) {
  const price = useMemo(() => {
    const formatCurrency = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode
    })
    return formatCurrency.format(amount)?.replace(/(\.0+|0+)$/, '')
  }, [amount, locale, currencyCode])
  return price
}
