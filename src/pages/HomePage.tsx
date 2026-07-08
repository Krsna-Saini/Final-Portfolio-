import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Journey from '../sections/Journey'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Journey />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
