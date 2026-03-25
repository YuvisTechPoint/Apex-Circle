type ApexCircleLogoProps = {
  className?: string
  textClassName?: string
  iconSize?: number
}

export const ApexCircleLogo = ({
  className = "",
  textClassName = "",
  iconSize = 36,
}: ApexCircleLogoProps) => {
  const strokeWidth = Math.max(3, Math.round(iconSize * 0.12))

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="36"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="190 60"
          transform="rotate(36 50 50)"
        />
        <path
          d="M34 70L50 30L66 70"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M41 58H59" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
      <span
        className={`tracking-[0.24em] uppercase text-sm font-semibold ${textClassName}`}
        style={{ fontFamily: "Figtree, sans-serif" }}
      >
        Apex Circle
      </span>
    </span>
  )
}
