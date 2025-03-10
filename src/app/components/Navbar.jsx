'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { HiMenu } from "react-icons/hi";
import Image from 'next/image'
import { annotate } from 'rough-notation'
import { usePathname } from 'next/navigation'

const NavLink = ({ href, isMobile = false, children, onClick }) => {
  const linkId = `${href}${isMobile ? '-mobile' : ''}`

  return (
    <Link 
      href={href}
      className="relative transition-colors duration-300 group"
      onClick={onClick}
    >
      {children}
      <span className={`absolute left-0 -bottom-1 w-full h-[3px] transition-all duration-300 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${
        isMobile ? 'bg-custom-orange' : 'bg-custom-orange'
      }`}></span>
    </Link>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()

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
      <div className="max-w-[1920px] mx-auto px-8 sm:px-24 lg:px-32 text-xl md:text-2xl py-4 pt-4 md:pt-8 uppercase">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 w-fit h-fit">
            <Link href="/" className="block w-fit h-fit" onClick={closeMenu}>
              <Image 
                src={pathname === '/' ? '/photos/logo-b.png' : '/photos/logo1.png'}
                alt="Logo"
                width={260}
                height={260}
                className="w-[210px] h-[45px] md:w-[310px] md:h-[60px] lg:w-[320px] lg:h-[65px] scale-105 transition-all duration-300 hover:scale-100"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-6 flex items-center text-3xl space-x-12 font-extrabold text-custom-orange">
              <NavLink href="/proyectos">Proyectos</NavLink>
              <NavLink href="/about">Nosotros</NavLink>
              <NavLink href="/reel">Reel</NavLink>
              <NavLink href="/contact">Contacto</NavLink>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 bg-custom-brown backdrop-blur-sm transition-transform duration-300 ease-in-out transform md:hidden ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-12 text-4xl pt-4 text-white">
              <NavLink href="/proyectos" isMobile onClick={closeMenu}>Proyectos</NavLink>
              <NavLink href="/about" isMobile onClick={closeMenu}>Nosotros</NavLink>
              <NavLink href="/reel" isMobile onClick={closeMenu}>Reel</NavLink>
              <NavLink href="/contact" isMobile onClick={closeMenu}>Contacto</NavLink>
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
                  className={`absolute inset-0 h-12 w-12 transition-all duration-300 ease-in-out transform ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                  } ${pathname === '/' ? 'text-white' : 'text-black'}`}
                />
                <HiMenu
                  className={`absolute inset-0 h-10 w-10 transition-all duration-300 ease-in-out transform ${
                    isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                  } ${pathname === '/' ? 'text-white' : 'text-black'}`}
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
