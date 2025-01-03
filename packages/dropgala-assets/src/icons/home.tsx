import * as React from 'react'

interface Props {
  width?: number
  height?: number
}

const HomeSvg = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      d="m16 8.5 1.53 1.53-1.06 1.06L10 4.62l-6.47 6.47-1.06-1.06L10 2.5l4 4v-2h2v4zm-6-2.46 6 5.99V18H4v-5.97zM12 17v-5H8v5h4z"
    />
  </svg>
)

export default HomeSvg
