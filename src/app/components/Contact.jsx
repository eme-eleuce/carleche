import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-32 px-4 md:px-8 mb-1 md:mb-12">
      <h1 className="mb-14 mt-14 text-4xl md:text-5xl lg:text-6xl font-bold text-center text-custom-brown uppercase animate-fadeIn" style={{animationDelay: '0ms'}}>
        Contacto
      </h1>
      <div className="max-w-[600px] mx-auto mb-20 animate-fadeIn" style={{animationDelay: '200ms'}}>
        <div className="border-2 border-custom-orange rounded-lg p-8 md:p-12">
          <div className="space-y-8">
            <a 
              href="https://wa.me/593980534230" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-xl md:text-2xl hover:text-custom-orange transition-colors duration-300"
            >
              <FaWhatsapp className="text-3xl md:text-4xl" />
              <span>+593 98 053 4230</span>
            </a>
            
            <a 
              href="https://www.instagram.com/iam_carleche/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-xl md:text-2xl hover:text-custom-orange transition-colors duration-300"
            >
              <FaInstagram className="text-3xl md:text-4xl" />
              <span>@iam_carleche</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
