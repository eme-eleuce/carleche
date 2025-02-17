'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { RiCloseLine } from 'react-icons/ri'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { annotate } from 'rough-notation'
import { getOptimizedImageUrl, generateSupabaseImageSrcSet, getBlurDataUrl, preloadImages, imageSizes, clearUrlCache } from '@/utils/imageUtils'
import { supabase, BUCKET_NAME, SUPABASE_URL } from '@/utils/supabaseClient'
import Link from 'next/link'

const Project_details = ({ projectId }) => {
  const [project, setProject] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const preloadedImages = useRef(new Set())

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single()

        if (projectError) throw projectError

        const { data: storageData, error: storageError } = await supabase
          .storage
          .from(BUCKET_NAME)
          .list(`${projectData.name}`)

        if (storageError) {
          throw storageError;
        }
        
        if (!storageData || storageData.length === 0) {
          setError('No se encontraron imágenes para este proyecto');
          return;
        }

        const imageUrls = storageData.map(image => {
          const baseUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${projectData.name}/${image.name}`
          return {
            url: getOptimizedImageUrl(baseUrl, imageSizes.large),
            thumbnail: getOptimizedImageUrl(baseUrl, imageSizes.thumbnail),
            blurUrl: getBlurDataUrl(),
            srcSet: generateSupabaseImageSrcSet(baseUrl)
          }
        })

        setProject(projectData)
        setImages(imageUrls)

        // Solo precargar las primeras 2 imágenes con tamaño pequeño
        preloadImages(imageUrls.slice(0, 2).map(img => img.thumbnail), imageSizes.small)
      } catch (error) {
        console.error('Error fetching project details:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      // Limpiar cache al cargar un nuevo proyecto
      clearUrlCache()
      fetchProjectDetails()
    }

    // Limpiar cache al desmontar el componente
    return () => {
      clearUrlCache()
    }
  }, [projectId])

  // Precargar imágenes adyacentes cuando se selecciona una imagen
  useEffect(() => {
    if (selectedImage !== null && images.length > 0) {
      const imagesToPreload = []
      const nextIndex = (selectedImage + 1) % images.length
      const prevIndex = (selectedImage - 1 + images.length) % images.length

      if (!preloadedImages.current.has(nextIndex)) {
        imagesToPreload.push(images[nextIndex].url)
        preloadedImages.current.add(nextIndex)
      }
      if (!preloadedImages.current.has(prevIndex)) {
        imagesToPreload.push(images[prevIndex].url)
        preloadedImages.current.add(prevIndex)
      }

      if (imagesToPreload.length > 0) {
        // Precargar con tamaño mediano para el modal
        preloadImages(imagesToPreload, imageSizes.medium)
      }
    }
  }, [selectedImage, images])

  const handleImageClick = (index) => {
    setSelectedImage(index)
    document.body.style.overflow = 'hidden'
  }

  const closeExpandedView = () => {
    setSelectedImage(null)
    document.body.style.overflow = ''
  }

  const navigateImage = useCallback((direction) => {
    setIsImageLoading(true)
    const newIndex = direction === 'next'
      ? (selectedImage + 1) % images.length
      : (selectedImage - 1 + images.length) % images.length
    setSelectedImage(newIndex)
  }, [selectedImage, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return
      
      switch(e.key) {
        case 'ArrowLeft':
          navigateImage('prev')
          break
        case 'ArrowRight':
          navigateImage('next')
          break
        case 'Escape':
          closeExpandedView()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, navigateImage])

  // Touch navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      navigateImage('next')
    } else if (isRightSwipe) {
      navigateImage('prev')
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-heartbeat">
          <Image
            src="/icon1.png"
            alt="Loading..."
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
    )
  }

  if (error) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl text-red-500">Error: {error}</p></div>
  if (!project) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">Proyecto no encontrado</p></div>

  return (
    <div className="container mx-auto px-4 py-8 uppercase">
      <h1 className="text-center text-4xl md:text-6xl font-bold mb-4 mt-8 text-custom-brown">{project.name}</h1>
      <h2 className="text-center text-2xl text-gray-600 mb-12">{project.client}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-24 lg:px-30">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-video overflow-hidden shadow-lg cursor-pointer group animate-fadeIn"
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image.thumbnail}
              alt={`${project.name} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={`(max-width: 640px) ${imageSizes.small}px, (max-width: 1080px) ${imageSizes.medium}px, ${imageSizes.small}px`}
              quality={75}
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={image.blurUrl}
              onError={(e) => {
                console.error(`Error loading image ${index + 1}:`, image.url)
                e.currentTarget.src = '/photos/placeholder.jpg'
              }}
            />
          </div>
        ))}
      </div>

      {/* Modal de vista expandida */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button 
            onClick={closeExpandedView}
            className="absolute top-4 right-4 text-white text-5xl hover:text-custom-orange transition-colors z-50"
          >
            <RiCloseLine />
          </button>
          
          <button 
            onClick={() => navigateImage('prev')}
            className="absolute left-4 md:left-8 text-white text-5xl hover:text-custom-orange transition-colors z-50"
          >
            <IoIosArrowBack />
          </button>

          <div className="relative w-[90vw] h-[80vh]">
            {/* Loading indicator */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 border-4 border-custom-orange border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <div 
              className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                isImageLoading ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <Image
                src={images[selectedImage].url}
                alt={`${project.name} - Image ${selectedImage + 1}`}
                fill
                className="object-contain transform transition-transform duration-300"
                quality={70}
                priority
                sizes={`${imageSizes.large}px`}
                placeholder="blur"
                blurDataURL={images[selectedImage].blurUrl}
                onLoadingComplete={() => {
                  setIsImageLoading(false);
                }}
                onError={(e) => {
                  console.error(`Error loading expanded image:`, images[selectedImage].url);
                  e.currentTarget.src = '/photos/placeholder.jpg';
                  setIsImageLoading(false);
                }}
              />
            </div>
          </div>

          <button 
            onClick={() => navigateImage('next')}
            className="absolute right-4 md:right-8 text-white text-5xl hover:text-custom-orange transition-colors z-50"
          >
            <IoIosArrowForward />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-12 py-12">
        <Link 
          href="/proyectos" 
          className="text-2xl md:text-4xl font-bold hover:text-custom-orange transition-colors duration-300"
          onMouseEnter={(e) => {
            const annotation = annotate(e.currentTarget, { 
              type: 'circle',
              color: '#ea8415',
              padding: 16,
              strokeWidth: 3,
              animationDuration: 250
            });
            annotation.show();
            e.currentTarget.addEventListener('mouseleave', () => {
              annotation.hide();
            }, { once: true });
          }}
        >
          Ir a proyectos
        </Link>
      </div>
    </div>
  )
}

export default Project_details