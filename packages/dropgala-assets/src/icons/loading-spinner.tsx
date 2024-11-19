type Props = {
  className?: string
  stroke: string
  size?: 'large' | 'small' | 'medium'
}

const LoadingSpinner = ({ className, stroke, size = 'small' }: Props) => {
  return (
    <div className={className}>
      {size === 'small' && (
        <svg
          id="loading-spinner"
          width="25"
          height="25"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            id="loading-circle-small"
            cx="20"
            cy="20"
            r="18"
            stroke={stroke}
            strokeWidth="4"
          />
        </svg>
      )}
      {size === 'medium' && (
        <svg
          id="loading-spinner"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            id="loading-circle-medium"
            cx="30"
            cy="30"
            r="27"
            stroke={stroke}
            strokeWidth="6"
          />
        </svg>
      )}
      {size === 'large' && (
        <svg
          id="loading-spinner"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            id="loading-circle-large"
            cx="40"
            cy="40"
            r="36"
            stroke={stroke}
            strokeWidth="8"
          />
        </svg>
      )}
    </div>
  )
}

export default LoadingSpinner
