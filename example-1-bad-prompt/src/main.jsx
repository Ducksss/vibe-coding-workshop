import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const sessions = [
  ['MORNING', 'A clear beginning', '10 min'],
  ['FOCUS', 'Quiet the open tabs', '12 min'],
  ['SLEEP', 'Let the day settle', '20 min'],
]

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2800)
    return () => clearTimeout(timer)
  }, [toast])

  const begin = () => {
    document.querySelector('#sessions')?.scrollIntoView({ behavior: 'smooth' })
    setToast('Your first quiet moment is ready.')
  }

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <nav className="nav wrap">
        <a className="logo" href="#top" aria-label="Still home">still<span>.</span></a>
        <button className="menu" aria-label="Toggle menu" aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)}>
          <i /><i />
        </button>
        <div className={`navlinks ${navOpen ? 'open' : ''}`}>
          <a href="#why">Why still</a><a href="#sessions">Sessions</a><a href="#journal">Journal</a>
          <button className="quiet-button small" onClick={begin}>Try it free <b>↗</b></button>
        </div>
      </nav>

      <section className="hero wrap" id="top">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> A softer place to land</p>
          <h1>Return to<br /><em>yourself.</em></h1>
          <p className="intro">A meditation practice made for real life: five quiet minutes between all the noise.</p>
          <div className="hero-actions">
            <button className="quiet-button" onClick={begin}>Begin your practice <b>↗</b></button>
            <a className="listen" href="#sessions"><span className="play">▶</span> Hear a preview</a>
          </div>
          <div className="people"><div className="faces"><span>MS</span><span>AK</span><span>JL</span><span>+</span></div><p><strong>700k+</strong> people breathing<br />a little easier</p></div>
        </div>

        <div className="scene" aria-label="A peaceful moon over distant hills" role="img">
          <div className="halo" /><div className="moon" />
          <div className="stars"><i /><i /><i /><i /><i /><i /></div>
          <div className="hill far" /><div className="hill near" />
          <svg className="line-art" viewBox="0 0 460 520" fill="none" aria-hidden="true"><path d="M-25 440c93-51 52-205 148-203 97 2 26 170 138 165 68-3 75-159 202-171"/><path d="M8 478c93-51 52-205 148-203 97 2 26 170 138 165 68-3 75-159 202-171"/></svg>
          <div className="now-playing"><span className="sound"><i/><i/><i/><i/></span><p><small>NOW PLAYING</small>Evening exhale</p><strong>12:04</strong></div>
        </div>
      </section>

      <section className="statement wrap" id="why">
        <p className="eyebrow"><span /> Made for the in-between</p>
        <h2>Less pressure to be<br /><em>perfectly present.</em></h2>
        <p>Still offers short, beautifully guided moments that meet you wherever you are—on a crowded train, before a difficult call, or under the covers.</p>
        <div className="rule" />
      </section>

      <section className="sessions wrap" id="sessions">
        <div className="section-head"><p className="eyebrow"><span /> A practice for every hour</p><a href="#sessions">Explore all sessions <b>↗</b></a></div>
        <div className="session-grid">
          {sessions.map(([time, name, length], i) => <article className={`session card-${i + 1}`} key={time}>
            <div className="orb" /><p>{time}</p><h3>{name}</h3><button onClick={() => setToast(`${name} will start in the full app.`)}><span>▶</span> {length}</button>
          </article>)}
        </div>
      </section>

      <section className="journal wrap" id="journal"><div><p className="eyebrow"><span /> Your space, yours alone</p><h2>A practice that<br /><em>grows with you.</em></h2></div><p>Track the subtle shift: how you arrived, what you noticed, and the small rituals that help you return.</p><div className="journal-mark">01<br /><small>slow down</small></div></section>

      <footer className="wrap"><a className="logo" href="#top">still<span>.</span></a><p>© 2025 Still, a little more room to be.</p><a href="#top">Back to top ↑</a></footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
