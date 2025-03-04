'use client'

import { usePathname } from 'next/navigation'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function LayoutContent({ children }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!isHomePage && <Footer />}
    </>
  )
} 