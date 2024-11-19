import React from 'react'
interface Props {
  width?: number
  height?: number
}
function UserIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M229.19 213c-15.81-27.32-40.63-46.49-69.47-54.62a70 70 0 10-63.44 0C67.44 166.5 42.62 185.67 26.81 213a6 6 0 1010.38 6c19.21-33.19 53.15-53 90.81-53s71.6 19.81 90.81 53a6 6 0 1010.38-6zM70 96a58 58 0 1158 58 58.07 58.07 0 01-58-58z"
      ></path>
    </svg>
  )
}

export default UserIcon
