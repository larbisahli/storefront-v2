import React from 'react'

function GridIcon(props: { width: number; height: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <rect
        width="176"
        height="176"
        x="48"
        y="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="20"
        ry="20"
      ></rect>
      <rect
        width="176"
        height="176"
        x="288"
        y="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="20"
        ry="20"
      ></rect>
      <rect
        width="176"
        height="176"
        x="48"
        y="288"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="20"
        ry="20"
      ></rect>
      <rect
        width="176"
        height="176"
        x="288"
        y="288"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="20"
        ry="20"
      ></rect>
    </svg>
  )
}

export default GridIcon
