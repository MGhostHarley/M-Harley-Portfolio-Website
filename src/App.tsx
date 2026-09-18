import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Stars from './components/Stars'
import { MotionContext } from './motion'
import useMediaQuery from './hooks/useMediaQuery'

export default function App() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [paused, setPaused] = useState(false)

  return (
    <MotionContext value={!reducedMotion && !paused}>
      <a
        className="fixed -top-25 left-4 z-100 bg-snow px-5 py-3.5 text-night focus:top-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <Stars />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative focus:outline-none"
      >
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer
        paused={paused}
        reducedMotion={reducedMotion}
        onTogglePause={() => setPaused(!paused)}
      />
    </MotionContext>
  )
}
