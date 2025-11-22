'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [showLogo, setShowLogo] = useState(true)

  const videos = [
    '/videos/4.mp4',
    '/videos/1.mp4',
    '/videos/5.mp4',
    '/videos/6.mp4'
  ]

  // Efecto para manejar la carga inicial
  useEffect(() => {
    // Ocultar el logo después de un tiempo para mostrar el video
    const timer = setTimeout(() => {
      setShowLogo(false)
      setShowVideo(true)
    }, 1000) // 1 segundo con el logo
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showVideo) {
      const interval = setInterval(() => {
        setCurrentVideoIndex(prev => (prev + 1) % videos.length)
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [showVideo])

  return (
    <>
      {/* Logo durante la carga inicial - sobrepuesto a todo incluyendo navbar */}
      <div className={`fixed inset-0 flex items-center justify-center bg-[#f3f3f3] transition-opacity duration-300 ${
        showLogo ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none z-0'
      }`}>
        <div className="animate-heartbeat">
          <Image
            src="/photos/icono_color.png"
            alt="Logo"
            width={190}
            height={190}
            priority
          />
        </div>
      </div>

      <div className="relative w-full h-screen overflow-hidden bg-white">

      {/* Videos */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        showVideo ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
      }`}>
        {videos.map((video, index) => (
          <div
            key={video}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </>
  )
}

export default Hero
