'use client'
import { useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'
import Image from 'next/image'

const Reel = () => {
  const containerRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)
  const videoId = '1056570752'

  useEffect(() => {
    if (containerRef.current && showVideo) {
      const player = new Player(containerRef.current, {
        id: videoId,
        width: '100%',
        loop: true,
        autoplay: true,
        responsive: true,
        controls: true,
      })
    }
  }, [showVideo])

  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-32 px-4 md:px-8 mb-1 md:mb-12">
      
      <div className="max-w-[1200px] mx-auto aspect-video relative">
        {!showVideo ? (
          <div 
            onClick={() => setShowVideo(true)}
            className="w-full h-full cursor-pointer relative group"
          >
            <Image
              src={`https://vumbnail.com/${videoId}.jpg`}
              alt="Reel thumbnail"
              fill
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 rounded-lg flex items-center justify-center">
              <svg 
                className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        ) : (
          <div 
            ref={containerRef}
            className="w-full h-full rounded-lg overflow-hidden shadow-2xl"
          />
        )}
      </div>
    </div>
  )
}

export default Reel
