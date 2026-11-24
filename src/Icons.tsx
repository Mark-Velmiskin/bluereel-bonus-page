type P = { size?: number; color?: string }

export const Lock = ({ size = 12, color = 'currentColor' }: P) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
    <rect x="2" y="5.5" width="8" height="5.5" rx="1.5" fill={color} />
    <path d="M4 5.5V4a2 2 0 1 1 4 0v1.5" stroke={color} strokeWidth="1.2" />
  </svg>
)

export const ArrowDown = ({ size = 16, color = 'currentColor' }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Plus = ({ size = 16, color = 'currentColor' }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3.5 8h9M8 3.5v9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export const Minus = ({ size = 16, color = 'currentColor' }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3.5 8h9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export const Close =({ size = 20, color = 'currentColor' }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="m5 5 10 10M15 5 5 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const Check = ({ size = 20, color = 'currentColor' }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="m4 10.5 4 4 8-9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Alert = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="8" fill="#D92D20" />
    <path d="M10 6v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="10" cy="13.8" r="1" fill="#fff" />
  </svg>
)

export const Clear = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="8" fill="#D0D0D0" />
    <path d="m7.5 7.5 5 5M12.5 7.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
