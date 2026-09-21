import Layout from '../components/Layout'
import Hero from '../components/Hero'
import NowStrip from '../components/NowStrip'
import SelectedWork from '../components/SelectedWork'
import Experience from '../components/Experience'
import About from '../components/About'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <Layout>
      {/* The hero and the "Now" strip together fill the first screen, below the nav. */}
      <div className="flex min-h-[calc(100svh-4rem)] flex-col">
        <Hero />
        <NowStrip />
      </div>
      <SelectedWork />
      <Experience />
      {/* Projects ("Built for fun") is hidden while the projects are updated. */}
      <About />
      <Contact />
    </Layout>
  )
}
