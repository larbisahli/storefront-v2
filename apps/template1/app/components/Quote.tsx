import dynamic from 'next/dynamic'

const MyQuote = dynamic(
    () => import('@acme/design-system/quote/quote'),
    {
      loading: () => <div className="h-[20px] w-[30px] bg-blue-600" />,
      ssr: true
    }
  )

const Quote = (props: any) => {
    return <MyQuote {...props}></MyQuote>
}

export default Quote