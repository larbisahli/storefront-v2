import React from 'react'
interface Props {
  width?: number
  height?: number
}
function MenuIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
      ></path>
    </svg>
  )
}

export default MenuIcon
