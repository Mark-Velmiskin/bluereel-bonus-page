import { useEffect, useState, type CSSProperties } from 'react'
import { reducedMotion } from './hooks'

/** Counts a number up from 0 like a slot reel, once on mount. */
export function CountUp({ to, prefix = '', duration = 1400, delay = 300 }: { to: number; prefix?: string; duration?: number; delay?: number }) {
  const [value, setValue] = useState(() => (reducedMotion() ? to : 0))
  useEffect(() => {
    if (reducedMotion()) return
    let raf = 0
    const t0 = performance.now() + delay
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / duration))
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, delay])
  return <span className="count-up">{prefix}{value.toLocaleString('en-US')}</span>
}

/** Short confetti burst (pure CSS), e.g. when a promo code is accepted. */
export function Confetti() {
  const colors = ['#8BEB5B', '#1E7AFF', '#984AFE', '#F9CB98', '#FFD54A']
  const pieces = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2
    const dist = 90 + (i % 5) * 22
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 60,
      r: (i * 47) % 360,
      c: colors[i % colors.length],
      d: (i % 7) * 18,
    }
  })
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p, i) => (
        <span key={i} style={{ '--x': `${p.x}px`, '--y': `${p.y}px`, '--r': `${p.r}deg`, background: p.c, animationDelay: `${p.d}ms` } as CSSProperties} />
      ))}
    </div>
  )
}
