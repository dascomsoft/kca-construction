'use client'

import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import WhyUs from './components/WhyUs'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Stats />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
    </>
  )
}