import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { getBreathPhase } from './timer'
import './styles.css'

const benefits = [
  ['01', 'Refocus between classes', 'Let the last lecture go before the next one begins.'],
  ['02', 'Unwind after studying', 'Trade the mental tabs for one steady breath.'],
  ['03', 'Build a daily habit', 'Small pauses make a surprisingly good ritual.'],
]

function App() {
  const [open, setOpen] = useState(false)
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(60)
  const closeButton = useRef(null)
  const complete = remaining === 0
  const phase = getBreathPhase(remaining)

  useEffect(() => {
    if (!open) return undefined
    closeButton.current?.focus()
  }, [open])

  useEffect(() => {
    if (!running || complete) return undefined
    const timer = window.setInterval(() => {
      setRemaining((seconds) => {
        if (seconds <= 1) {
          setRunning(false)
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [running, complete])

  function beginSession() {
    setRemaining((seconds) => (seconds === 0 ? 60 : seconds))
    setRunning(true)
    setOpen(true)
  }

  function reset() {
    setRunning(false)
    setRemaining(60)
  }

  function closeSession() {
    setRunning(false)
    setOpen(false)
  }

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Still home">Still<span>.</span></a>
        <button className="nav-button" onClick={beginSession}>Try a session <span aria-hidden="true">↗</span></button>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> A pocket of quiet for students</p>
          <h1 id="hero-title">A calmer mind.<br /><em>One minute</em><br />at a time.</h1>
          <p className="lede">A short, guided pause for the space between everything else.</p>
          <button className="primary-button" onClick={beginSession}>Start a 1-minute break <span aria-hidden="true">→</span></button>

        </div>

        <div className="orb-scene" aria-label="A gently breathing circle" role="img">
          <div className="scene-caption">A little room to breathe</div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="breath-orb"><span>just<br /><em>breathe.</em></span></div>
          <p>Inhale for 5 seconds. Exhale for 5.</p>
        </div>
      </section>

      <section className="benefits" aria-labelledby="benefits-title">
        <div className="benefits-intro">
          <p className="section-note">Made for the in-between</p>
          <h2 id="benefits-title">Small pause.<br /><em>Fresh perspective.</em></h2>
        </div>
        <div className="benefit-list">
          {benefits.map(([number, title, copy]) => <article className="benefit" key={number}>
            <span className="benefit-number">{number}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>)}
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">Still<span>.</span></a>
        <p>One quiet minute can be enough.</p>
        <p>© {new Date().getFullYear()} Still</p>
      </footer>

      {open && <div className="modal-backdrop" onMouseDown={closeSession}>
        <section className="session" role="dialog" aria-modal="true" aria-labelledby="session-title" onKeyDown={(event) => event.key === 'Escape' && closeSession()} onMouseDown={(event) => event.stopPropagation()}>
          <button ref={closeButton} className="close-button" onClick={closeSession} aria-label="Close breathing exercise">×</button>
          <p className="eyebrow"><span /> One-minute break</p>
          <h2 id="session-title">{complete ? 'You made space for yourself.' : phase}</h2>
          <div className={`timer-orb ${running ? 'is-breathing' : ''} ${complete ? 'is-complete' : ''}`} aria-live="polite">
            <strong>{remaining}</strong><span>seconds</span>
          </div>
          <p className="session-copy">{complete ? 'Your minute is complete. Take this softer pace with you.' : running ? 'Let your breath follow the circle.' : 'Press start when you are ready.'}</p>
          <div className="controls" aria-label="Timer controls">
            <button className="primary-button" onClick={() => setRunning((active) => !active)} disabled={complete}>{running ? 'Pause' : 'Start'}</button>
            <button className="text-button" onClick={reset}>Reset</button>
          </div>
        </section>
      </div>}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
