interface Props {
  width?: number
  height?: number
}
const CheckSvg = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="m8.818 19.779-6.364-6.364 2.83-2.83 3.534 3.544 9.898-9.908 2.83 2.83L8.818 19.779Z"
    />
  </svg>
)

export default CheckSvg
