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
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Carleche / Editor - Color Grading
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
