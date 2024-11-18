'use client'
import dynamic from 'next/dynamic'

const MyButton = dynamic(
    () => import('@acme/design-system/button/button'),
    {
      loading: () => <div className="h-[20px] w-[30px] bg-red-600" />,
      ssr: false
    }
  )

const Button = (props: any) => {
    return <MyButton {...props}></MyButton>
}

export default Button