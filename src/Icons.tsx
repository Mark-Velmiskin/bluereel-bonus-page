type P = { size?: number; color?: string }

/** iOS Safari bottom bar, shown only in the desktop preview (real phones have their own). */
export const SafariBar = () => (
  <div className="safari" aria-hidden>
    <div className="safari__row">
      <span className="safari__btn">
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M10 2 2 10l8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span className="safari__url">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><rect x="1" y="1" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M5 5h8M5 9h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        <span>bluereel.com</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 8A5.5 5.5 0 1 1 11.6 3.8M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span className="safari__btn">
        <svg width="20" height="4" viewBox="0 0 20 4" fill="currentColor"><circle cx="2" cy="2" r="2" /><circle cx="10" cy="2" r="2" /><circle cx="18" cy="2" r="2" /></svg>
      </span>
    </div>
    <span className="safari__home" />
  </div>
)

/** iOS-style status bar, shown only in the desktop preview (real phones have their own). */
export const StatusBar = () => (
  <div className="statusbar" aria-hidden>
    <span className="statusbar__time">5:13</span>
    <span className="statusbar__icons">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
        <rect x="10" y="3" width="3" height="9" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
        <path d="M8 2.3c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6C5.2.6 2.7 1.7.8 3.5L2 4.7a8.5 8.5 0 0 1 6-2.4Z" />
        <path d="M8 5.6c1.4 0 2.7.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 3.9c-1.9 0-3.6.7-4.8 1.9L4.4 7c.9-.9 2.2-1.4 3.6-1.4Z" />
        <path d="M8 8.9c.5 0 1 .2 1.3.5L8 11.4 6.7 9.4c.3-.3.8-.5 1.3-.5Z" />
      </svg>
      <span className="statusbar__battery"><span>76</span></span>
    </span>
  </div>
)

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
