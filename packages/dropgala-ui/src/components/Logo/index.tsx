import React from 'react'
import { StoreProps } from '@dropgala/store'
import Link from '../common/Link'
import Image from '../common/Image'

interface Props extends StoreProps {}

const Logo: React.FC<Props> = ({ useAppSelector, ...props }) => {
  return (
    <div className="">
      <Link href="/">
        {/* <Image
          isCustomUrl
          src={'/'}
          objectFit="contain"
          height={30}
          width={30}
          alt="logo"
        /> */}
        Logo
      </Link>
    </div>
  )
}

export default Logo
