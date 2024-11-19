import React from 'react'

function ListIcon(props: { width: number; height: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M144 144h320M144 256h320M144 368h320"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M64 128h32v32H64zm0 112h32v32H64zm0 112h32v32H64z"
      ></path>
    </svg>
  )
}

export default ListIcon
