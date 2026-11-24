import { useEffect, useRef, useState } from 'react'
import { Alert, Check, Clear, Close } from './Icons'
import { VALID_PROMO } from './data'

type Status = 'idle' | 'loading' | 'error' | 'success'

type Props = {
  onClose: () => void
  onApplied: (code: string) => void
  onSignUp: () => void
}

export function PromoSheet({ onClose, onApplied, onSignUp }: Props) {
  const [code, setCode] = useState('')
  const [focused, setFocused] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const apply = () => {
    if (!code.trim() || status === 'loading') return
    inputRef.current?.blur()
    setStatus('loading')
    setTimeout(() => {
      if (code.trim().toUpperCase() === VALID_PROMO) {
        setStatus('success')
        onApplied(VALID_PROMO)
      } else {
        setStatus('error')
      }
    }, 1200)
  }

  const fieldState =
    status === 'error' ? 'is-error'
    : status === 'success' ? 'is-success'
    : status === 'loading' ? 'is-disabled'
    : focused ? 'is-focus' : ''

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="promo-title">
        <div className="sheet__grabber" />
        <div>
          <div className="sheet__title-row">
            <h2 id="promo-title" className="t-h1">Promo code</h2>
            <button className="icon-btn" onClick={onClose} aria-label="Close"><Close size={18} /></button>
          </div>
          <p className="sheet__subtitle t-body-md">Enter it before sign-up to get the extra reward.</p>
        </div>

        <div>
          <label className={`field ${fieldState}`}>
            <input
              ref={inputRef}
              value={code}
              placeholder="Enter promo code"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="done"
              disabled={status === 'loading' || status === 'success'}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => { setCode(e.target.value); if (status === 'error') setStatus('idle') }}
              onKeyDown={(e) => e.key === 'Enter' && apply()}
              aria-invalid={status === 'error'}
              aria-describedby="promo-helper"
            />
            {status === 'error' && <Alert />}
            {status === 'success' && <Check color="#8BEB5B" />}
            {status === 'idle' && code && (
              <button type="button" onClick={() => { setCode(''); inputRef.current?.focus() }} aria-label="Clear">
                <Clear />
              </button>
            )}
          </label>
          <div id="promo-helper" aria-live="polite">
            {status === 'error' && <p className="field__helper field__helper--error">This code isn’t valid or has expired</p>}
            {status === 'success' && <p className="field__helper field__helper--success">Code accepted: +50 free spins after sign-up</p>}
            {status === 'idle' && !code && <p className="field__helper" style={{ color: 'var(--color-text-tertiary)' }}>Try {VALID_PROMO}</p>}
          </div>
        </div>

        {status === 'success' ? (
          <button className="btn btn--primary" onClick={onSignUp}>Sign up & get your bonus</button>
        ) : (
          <button className="btn btn--primary" disabled={!code.trim() || status === 'loading'} onClick={apply}
            style={status === 'loading' ? { background: 'var(--color-action-primary)', color: '#000' } : undefined}>
            {status === 'loading' ? (<><span className="spinner" /> Applying…</>) : 'Apply'}
          </button>
        )}
      </div>
    </>
  )
}
