'use client'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-custom-brown text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link 
            href="https://www.instagram.com/iam_carleche/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-custom-orange transition-colors"
          >
            @iam_carleche
          </Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Carleche / Editor - Color Grading
            </p>
            
            {/* Separator */}
            <span className="hidden sm:inline text-gray-400 text-lg">|</span>
            
            {/* Desarrollado por */}
            <div>
              <span>desarrollado por </span>
              <a
                href="https://www.eme-eleuce.com/work/websites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-orange font-bold underline"
              >
                luis eme
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
