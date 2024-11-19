import React from 'react'
import { useRouter } from 'next/router'
import Link from '../common/Link'

const Pagination: React.FC<{}> = () => {
  const router = useRouter()
  const {
    query,
    query: { page }
  } = router

  const currentPage =
    isNaN(parseInt(page as string)) || parseInt(page as string) === 0
      ? 1
      : parseInt(page as string)

  return (
    <div className="flex items-center justify-center">
      <Link
        href={{
          pathname: router.pathname,
          query: {
            ...query,
            page: currentPage + 1
          }
        }}
        scroll={false}
      >
        <div
          className="flex items-center text-sm lg:text-base font-medium border border-gray-900 px-5 py-3
         hover:shadow-card hover:text-rose-500 uppercase"
        >
          Load more products
        </div>
      </Link>
    </div>
  )
}

export default Pagination
