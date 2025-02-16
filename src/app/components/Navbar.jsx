'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import Image from 'next/image'
import { annotate } from 'rough-notation'

const NavLink = ({ href, isMobile = false, children, onClick }) => {
  const linkId = `${href}${isMobile ? '-mobile' : ''}`

  useEffect(() => {
    const element = document.querySelector(`[data-link="${linkId}"]`)
    if (!element) return

    const annotation = annotate(element, { 
      type: 'box',
      color: '#ea8415',
      strokeWidth: 2,
      animationDuration: 250
    })

    const handleMouseEnter = () => annotation.show()
    const handleMouseLeave = () => annotation.hide()

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      annotation.remove()
    }
  }, [linkId])

  return (
    <Link 
      href={href}
      className="relative transition-colors duration-300 hover:text-custom-orange"
      data-link={linkId}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setHasScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className={`fixed w-full z-50 mt-0 transition-colors duration-300 ${
      hasScrolled ? 'bg-[#f8f8f8]' : 'bg-transparent'
    }`}>
      <div className="max-w-[1920px] mx-auto px-8 sm:px-24 lg:px-32 text-xl md:text-2xl py-4 pt-4 md:pt-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 w-fit h-fit">
            <Link href="/" className="block w-fit h-fit" onClick={closeMenu}>
              <Image 
                src="/photos/logo-n.png"
                alt="Logo"
                width={260}
                height={260}
                className="w-[250px] h-[60px] md:w-[330px] md:h-[70px] lg:w-[340px] lg:h-[70px] scale-105 transition-all duration-300 hover:scale-100"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-6 flex items-center space-x-12 font-bold">
              <NavLink href="/proyectos">Proyectos</NavLink>
              <NavLink href="/servicios">Servicios</NavLink>
              <NavLink href="/reel">Reel</NavLink>
              <NavLink href="/contacto">Contacto</NavLink>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 bg-white/90 backdrop-blur-sm transition-transform duration-300 ease-in-out transform md:hidden ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-3xl pt-16">
              <NavLink href="/proyectos" isMobile onClick={closeMenu}>Proyectos</NavLink>
              <NavLink href="/servicios" isMobile onClick={closeMenu}>Servicios</NavLink>
              <NavLink href="/reel" isMobile onClick={closeMenu}>Reel</NavLink>
              <NavLink href="/contacto" isMobile onClick={closeMenu}>Contacto</NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-50">
            <button
              onClick={toggleMenu}
              className="focus:outline-none relative z-50 w-8 h-8"
            >
              <div className="relative w-full h-full">
                <RiCloseLine 
                  className={`absolute inset-0 h-8 w-8 transition-all duration-300 ease-in-out transform ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                  }`}
                />
                <RiMenu3Line 
                  className={`absolute inset-0 h-8 w-8 transition-all duration-300 ease-in-out transform ${
                    isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
