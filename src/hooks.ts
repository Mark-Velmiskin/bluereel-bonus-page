import { useEffect, type RefObject } from 'react'

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Fade + rise elements marked with [data-reveal] when they scroll into view. */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('[data-reveal]')
    if (reducedMotion()) { items.forEach((i) => i.classList.add('is-in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      })
    }, { root: el, threshold: 0.15 })
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [root])
}

/** Hover for cards with .fx-card: soft spotlight that follows the pointer and a slight 3D tilt. */
export function useCardHover(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current
    if (!el || !canHover() || reducedMotion()) return
    let active: HTMLElement | null = null
    const reset = (c: HTMLElement) => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg') }
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.fx-card')
      if (active && active !== card) reset(active)
      active = card
      if (!card) return
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      card.style.setProperty('--mx', `${x * 100}%`)
      card.style.setProperty('--my', `${y * 100}%`)
      card.style.setProperty('--rx', `${(0.5 - y) * 4}deg`)
      card.style.setProperty('--ry', `${(x - 0.5) * 5}deg`)
    }
    const onLeave = () => { if (active) reset(active); active = null }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave) }
  }, [root])
}
