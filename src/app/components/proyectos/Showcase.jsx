'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getOptimizedImageUrl, generateSupabaseImageSrcSet, getBlurDataUrl, imageSizes } from '@/utils/imageUtils'
import { supabase, BUCKET_NAME, SUPABASE_URL } from '@/utils/supabaseClient'

const Showcase = () => {
  const [allProjects, setAllProjects] = useState([])  // Todos los proyectos
  const [currentProjects, setCurrentProjects] = useState([])  // Proyectos de la página actual
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')

        if (projectsError) throw projectsError

        const projectsWithImages = projectsData.map(project => {
          const filePath = `project${project.id}/image1.png`
          const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`
          const optimizedImageUrl = getOptimizedImageUrl(imageUrl)
          const srcSet = generateSupabaseImageSrcSet(imageUrl)
          
          return {
            ...project,
            imageUrl: optimizedImageUrl,
            srcSet
          }
        })

        setAllProjects(projectsWithImages)
      } catch (error) {
        console.error('Error in fetchProjects:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * projectsPerPage
    const endIndex = startIndex + projectsPerPage
    setCurrentProjects(allProjects.slice(startIndex, endIndex))
  }, [currentPage, allProjects])

  const changePage = (newPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(newPage)
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
  if (currentProjects.length === 0) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">No hay proyectos disponibles</p></div>

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:px-24 lg:px-32">
        {currentProjects.map((project, index) => (
          <div 
            key={`${currentPage}-${project.id}`} 
            className="relative group overflow-hidden rounded-lg shadow-lg animate-fadeIn"
            style={{ 
              animationDelay: `${index * 150}ms` 
            }}
          >
            <Link href={`/proyectos/${project.id}`}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={`(max-width: 640px) ${imageSizes.small}px, (max-width: 1080px) ${imageSizes.medium}px, ${imageSizes.small}px`}
                  quality={70}
                  priority={project.id <= 2}
                  loading={project.id <= 2 ? "eager" : "lazy"}
                  onError={(e) => {
                    console.error(`Error loading image for project ${project.id}:`, project.imageUrl)
                    e.currentTarget.src = '/photos/placeholder.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-black/15">
                  <div className="flex flex-col justify-center items-center h-full text-white">
                    <h2 className="text-2xl font-bold mb-2 text-center px-4">{project.name}</h2>
                    <h2 className="text-xl font-bold mb-2 text-center px-4">{project.client}</h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button 
          onClick={() => changePage(1)}
          className={`px-3 py-1 font-bold ${currentPage === 1 ? 'bg-gray-200' : 'bg-white'} border rounded`}
        >
          1
        </button>
        {[2, 3].map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => changePage(pageNum)}
            className={`px-3 py-1 font-bold ${currentPage === pageNum ? 'bg-gray-200' : 'bg-white'} border rounded`}
          >
            {pageNum}
          </button>
        ))}
        <button 
          onClick={() => changePage(currentPage + 1)}
          className="px-3 py-1 font-bold bg-white border rounded"
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  )
}

export default Showcase