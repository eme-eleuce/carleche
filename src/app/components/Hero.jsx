'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isBlurring, setIsBlurring] = useState(false)

  const images = [
    '/photos/foto3.png',
    '/photos/foto2.png',
    '/photos/foto5.png',
    '/photos/foto4.png',
    '/photos/foto6.png'
  ]

  const videos = [
    '/videos/4.mp4',
    '/videos/1.mp4',
    '/videos/5.mp4',
    '/videos/6.mp4'
  ]

  useEffect(() => {
    if (!showVideo) {
      const interval = setInterval(() => {
        if (currentImageIndex < images.length - 1) {
          setCurrentImageIndex(prev => prev + 1)
        } else {
          setShowVideo(true)
        }
      }, 400)

      return () => clearInterval(interval)
    }
  }, [currentImageIndex, showVideo])

  useEffect(() => {
    if (showVideo) {
      const interval = setInterval(() => {
        setCurrentVideoIndex(prev => (prev + 1) % videos.length)
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [showVideo])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-500/30">
      {/* Imágenes */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-all duration-500 ${
            !showVideo && index === currentImageIndex 
              ? 'translate-y-0 opacity-100' 
              : index < currentImageIndex 
                ? '-translate-y-full opacity-0'
                : 'translate-y-full opacity-0'
          } ${showVideo ? 'opacity-0' : ''}`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={100}
          />
        </div>
      ))}

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
  )
}

export default Hero
