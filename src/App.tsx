import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Inbox = lazy(() => import('./pages/Inbox'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />

      {/* global ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-ink-950" />
      <div className="noise pointer-events-none fixed inset-0 -z-10 opacity-[0.015]" />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
