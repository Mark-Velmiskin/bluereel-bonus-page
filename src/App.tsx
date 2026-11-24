import { useCallback, useEffect, useRef, useState } from 'react'
import { days, deposits, faq, wheelPrizes } from './data'
import { ArrowDown, Check, Lock, Minus, Plus, StatusBar } from './Icons'
import { PromoSheet } from './PromoSheet'
import { CountUp } from './fx'
import { useCardHover, useReveal } from './hooks'

export default function App() {
  const screenRef = useRef<HTMLDivElement>(null)
  const heroCtaRef = useRef<HTMLButtonElement>(null)
  const depositsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const daysRef = useRef<HTMLDivElement>(null)

  const [solidHeader, setSolidHeader] = useState(false)
  const [showBottomCta, setShowBottomCta] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useReveal(screenRef)
  useCardHover(screenRef)

  // Header turns solid once the hero image scrolls under it
  useEffect(() => {
    const el = screenRef.current
    if (!el) return
    const onScroll = () => setSolidHeader(el.scrollTop > 280)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Sticky CTA appears when the hero CTA leaves the viewport
  useEffect(() => {
    const target = heroCtaRef.current
    if (!target) return
    const io = new IntersectionObserver(([e]) => setShowBottomCta(!e.isIntersecting), {
      root: screenRef.current,
      threshold: 0,
    })
    io.observe(target)
    return () => io.disconnect()
  }, [])

  // Daily strip: when it first comes into view, glide to Day 7 and back to hint that it scrolls.
  // Stops as soon as the user touches the strip.
  useEffect(() => {
    const strip = daysRef.current
    if (!strip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    const timers: number[] = []
    const stop = () => { cancelled = true; timers.forEach(clearTimeout) }
    strip.addEventListener('pointerdown', stop, { once: true })
    strip.addEventListener('wheel', stop, { once: true })
    const glide = (to: number, ms: number) => {
      const from = strip.scrollLeft
      const start = performance.now()
      const step = (now: number) => {
        if (cancelled) return
        const t = Math.min(1, (now - start) / ms)
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        strip.scrollLeft = from + (to - from) * ease
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const max = strip.scrollWidth - strip.clientWidth
      timers.push(window.setTimeout(() => glide(max, 1400), 300))
      timers.push(window.setTimeout(() => glide(0, 1200), 2300))
    }, { root: screenRef.current, threshold: 0.9 })
    io.observe(strip)
    return () => { stop(); io.disconnect() }
  }, [])

  // Sign-up itself is out of scope for this prototype: the buttons only close the promo sheet
  const signUp = useCallback(() => setPromoOpen(false), [])

  const scrollTo = (el: HTMLElement | null) => el?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="device">
      {/* Header: iOS status bar (desktop preview only) + app bar */}
      <header className={`header ${solidHeader ? 'is-solid' : ''}`}>
        <StatusBar />
        <div className="appbar">
          <button className="logo" onClick={() => screenRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Bluereel, back to top">
            <img src="/img/logo-mark.png" alt="" />Bluereel
          </button>
          {appliedCode ? (
            <span className="applied-chip"><Check size={14} color="#55B02A" />{appliedCode}</span>
          ) : (
            <button className="btn-glass" onClick={() => setPromoOpen(true)}>Promo code?</button>
          )}
        </div>
      </header>

      <div className="screen" ref={screenRef}>

        {/* Hero */}
        <section className="hero">
          <img className="hero__img" src="/img/hero-gift.png" alt="Gift box with coins" />
          <h1 className="hero__title t-display" aria-label="Up to $1,500 +75 spins">
            <span className="word" style={{ animationDelay: '0ms' }}>Up</span>{' '}
            <span className="word" style={{ animationDelay: '60ms' }}>to</span>{' '}
            <span className="word accent" style={{ animationDelay: '120ms' }}><CountUp to={1500} prefix="$" /></span>
            <br />
            <span className="word accent" style={{ animationDelay: '200ms' }}>+<CountUp to={75} delay={500} /></span>{' '}
            <span className="word" style={{ animationDelay: '260ms' }}>spins</span>
          </h1>
          <p className="hero__subtitle t-body-md rise" style={{ animationDelay: '360ms' }}>A bonus on each of your first 4 deposits</p>
          <button ref={heroCtaRef} className="btn btn--primary btn--shine hero__cta rise" style={{ animationDelay: '440ms' }} onClick={signUp}>Sign up & get your bonus</button>
          <button className="hero__more" onClick={() => scrollTo(depositsRef.current)}>See how it works <ArrowDown /></button>        </section>

        {/* Welcome offer ladder */}
        <section className="section" ref={depositsRef}>
          <div className="section__head" data-reveal>
            <h2 className="t-h1">A bonus on each of your<br />first 4 deposits</h2>
            <p className="t-body-md">Unlock each reward in order</p>
          </div>
          <div className="stack">
            {deposits.map((d) =>
              d.active ? (
                <article key={d.step} className="deposit deposit--active fx-card" data-reveal>
                  <span className="chip chip--white">{d.chip}</span>
                  <p className="deposit__amount t-h2">{d.amount}<br />{d.extra}</p>
                  <img className="deposit__img" src="/img/deposit-gift.png" alt="" />
                </article>
              ) : (
                <article key={d.step} className="deposit fx-card" data-reveal>
                  <span className="chip">{d.chip}</span>
                  <p className="deposit__amount t-h2">{d.amount}</p>
                  <p className="deposit__status t-body-md">{d.status} <Lock /></p>
                </article>
              ),
            )}
          </div>
          <p className="terms-line" data-reveal>
            Min. deposit $10 · Wagering x35 · 30 days · <a onClick={() => scrollTo(faqRef.current)}>Full terms</a>
          </p>
        </section>

        {/* More bonuses */}
        <section className="section">
          <div className="section__head" data-reveal>
            <h2 className="t-h1">More bonuses on top<br />of your welcome package</h2>
          </div>
          <div className="stack">
            <article className="bonus-card fx-card" data-reveal>
              <h3 className="t-h2 bonus-card__title--brand">Daily Bonus</h3>
              <p className="bonus-card__desc t-body-sm">Log in daily, win cash and free spins (FS).</p>
              <div className="days" role="list" ref={daysRef}>
                {days.map((d, i) => (
                  <div key={d.day} role="listitem" className={`day ${i === 0 ? 'day--active' : ''}`}>
                    <span className="t-label">{d.day}</span>
                    <span className="day__reward">{d.reward}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn--secondary btn--md" onClick={signUp}>Sign up to claim Day 1</button>
            </article>

            <article className="bonus-card wheel-card fx-card" data-reveal>
              <img className="wheel-card__img" src="/img/wheel.png" alt="" />
              <h3 className="t-h2 bonus-card__title--promo wheel-card__title">Spin the wheel,<br />win free spins!</h3>
              <div className="chips">
                {wheelPrizes.map((p) => <span key={p} className="chip">{p}</span>)}
              </div>
              <button className="btn btn--secondary btn--md" onClick={signUp}>Sign up to spin</button>
            </article>
          </div>
        </section>

        {/* Terms & FAQ */}
        <section className="section" ref={faqRef}>
          <div className="section__head" data-reveal>
            <h2 className="t-h1">Before you sign up</h2>
            <p className="t-body-md">Bonus rules in plain words</p>
          </div>
          <div className="faq" data-reveal>
            {faq.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q} className={`faq__item ${open ? 'is-open' : ''}`}>
                  <button className="faq__q" aria-expanded={open} onClick={() => setOpenFaq(open ? null : i)}>
                    <span>{item.q}</span>
                    <span className="faq__toggle">{open ? <Minus /> : <Plus />}</span>
                  </button>
                  <div className="faq__a"><div>{item.a}</div></div>
                </div>
              )
            })}
            <div className="faq__item">
              <button className="faq__q">
                <span>Read full bonus terms</span>
                <span className="faq__toggle"><Plus /></span>
              </button>
            </div>
          </div>
          <div className="footer-space" />
        </section>
      </div>

      {/* Sticky sign-up */}
      <div className={`bottom-cta ${showBottomCta && !promoOpen ? 'is-visible' : ''}`}>
        <button className="btn btn--primary btn--shine" onClick={signUp}>Sign up & get your bonus</button>
      </div>

      <span className="home-indicator" aria-hidden />

      {promoOpen && (
        <PromoSheet
          onClose={() => setPromoOpen(false)}
          onApplied={(c) => setAppliedCode(c)}
          onSignUp={signUp}
        />
      )}
    </div>
  )
}
