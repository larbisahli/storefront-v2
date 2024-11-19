import type { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'
import NextLink from 'next/link'

const Link: React.FC<
  NextLinkProps & {
    children: React.ReactNode
    className?: string
    [key: string]: any
  }
> = ({ isCheckLink = false, link, href, children, ...props }) => {
  if (isCheckLink && !link) {
    return <>{children}</>
  }
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
