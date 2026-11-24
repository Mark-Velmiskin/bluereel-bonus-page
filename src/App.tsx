import { useCallback, useEffect, useRef, useState } from 'react'
import { days, deposits, faq, wheelPrizes } from './data'
import { ArrowDown, Check, Lock, Minus, Plus } from './Icons'
import { PromoSheet } from './PromoSheet'

export default function App() {
  const screenRef = useRef<HTMLDivElement>(null)
  const heroCtaRef = useRef<HTMLButtonElement>(null)
  const depositsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)

  const [solidHeader, setSolidHeader] = useState(false)
  const [showBottomCta, setShowBottomCta] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)

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

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2800)
    return () => clearTimeout(t)
  }, [toast])

  const signUp = useCallback(() => {
    setPromoOpen(false)
    setToast(appliedCode ? `Sign-up opens here · ${appliedCode} will be applied` : 'Sign-up opens here (out of scope for this prototype)')
  }, [appliedCode])

  const scrollTo = (el: HTMLElement | null) => el?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="device">
      <div className="screen" ref={screenRef}>
        {/* Header */}
        <header className={`header ${solidHeader ? 'is-solid' : ''}`}>
          <div className="logo"><img src="/img/logo-mark.png" alt="" />Bluereel</div>
          {appliedCode ? (
            <span className="applied-chip"><Check size={14} color="#55B02A" />{appliedCode}</span>
          ) : (
            <button className="btn-glass" onClick={() => setPromoOpen(true)}>Promo code?</button>
          )}
        </header>

        {/* Hero */}
        <section className="hero">
          <img className="hero__img" src="/img/hero-gift.png" alt="Gift box with coins" />
          <h1 className="hero__title t-display">
            Up to <span className="accent">$1,500</span>
            <br />
            <span className="accent">+75</span> spins
          </h1>
          <p className="hero__subtitle t-body-md">A bonus on each of your first 4 deposits</p>
          <button ref={heroCtaRef} className="btn btn--primary hero__cta" onClick={signUp}>Sign up & get your bonus</button>
          <button className="hero__more" onClick={() => scrollTo(depositsRef.current)}>See how it works <ArrowDown /></button>
          <span className="hero__url">bluereel.com</span>
        </section>

        {/* Welcome offer ladder */}
        <section className="section" ref={depositsRef}>
          <div className="section__head">
            <h2 className="t-h1">A bonus on each of your<br />first 4 deposits</h2>
            <p className="t-body-md">Unlock each reward in order</p>
          </div>
          <div className="stack">
            {deposits.map((d) =>
              d.active ? (
                <article key={d.step} className="deposit deposit--active">
                  <span className="chip chip--white">{d.chip}</span>
                  <p className="deposit__amount t-h2">{d.amount}<br />{d.extra}</p>
                  <img className="deposit__img" src="/img/deposit-gift.png" alt="" />
                </article>
              ) : (
                <article key={d.step} className="deposit">
                  <span className="chip">{d.chip}</span>
                  <p className="deposit__amount t-h2">{d.amount}</p>
                  <p className="deposit__status t-body-md">{d.status} <Lock /></p>
                </article>
              ),
            )}
          </div>
          <p className="terms-line">
            Min. deposit $10 · Wagering x35 · 30 days · <a onClick={() => scrollTo(faqRef.current)}>Full terms</a>
          </p>
        </section>

        {/* More bonuses */}
        <section className="section">
          <div className="section__head">
            <h2 className="t-h1">More bonuses on top<br />of your welcome package</h2>
          </div>
          <div className="stack">
            <article className="bonus-card">
              <h3 className="t-h2 bonus-card__title--brand">Daily Bonus</h3>
              <p className="bonus-card__desc t-body-sm">Log in daily, win cash and free spins (FS).</p>
              <div className="days" role="list">
                {days.map((d, i) => (
                  <div key={d.day} role="listitem" className={`day ${i === 0 ? 'day--active' : ''}`}>
                    <span className="t-label">{d.day}</span>
                    <span className="day__reward">{d.reward}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn--secondary btn--md" onClick={signUp}>Sign up to claim Day 1</button>
            </article>

            <article className="bonus-card wheel-card">
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
          <div className="section__head">
            <h2 className="t-h1">Before you sign up</h2>
            <p className="t-body-md">Bonus rules in plain words</p>
          </div>
          <div className="faq">
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
              <button className="faq__q" onClick={() => setToast('Full bonus terms open here')}>
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
        <button className="btn btn--primary" onClick={signUp}>Sign up & get your bonus</button>
      </div>

      {toast && (
        <div className="toast" role="status"><Check size={18} color="#55B02A" />{toast}</div>
      )}

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
