const IconPlaceholder = ({
  width = 25,
  height = 25
}: {
  width?: number
  height?: number
}) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="bg-gray-300 rounded-sm animated-background"
    ></div>
  )
}

export default IconPlaceholder
