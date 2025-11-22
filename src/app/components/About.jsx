export default function About() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-20 px-4 md:px-8 mb-1 md:mb-12">
      
      <div className="max-w-[1100px] mx-auto mb-20 space-y-10 text-xl md:text-2xl text-center">
        <div className="flex justify-center mb-10 animate-fadeIn" style={{animationDelay: '200ms'}}>
          <img 
            src="/photos/Escritorio.jpg" 
            alt="Escritorio" 
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-3xl md:text-4xl font-medium animate-fadeIn" style={{animationDelay: '400ms'}}>
          Damos vida a tus historias a través del color.
        </p>
        <p className="animate-fadeIn" style={{animationDelay: '600ms'}}>
          En <strong>Carleche | Editor - Color Grading</strong>, transformamos la postproducción audiovisual en una experiencia visual envolvente. Somos especialistas en color grading, combinando arte y técnica para potenciar cada imagen con profundidad, emoción y significado.
        </p>
        <p className="animate-fadeIn" style={{animationDelay: '800ms'}}>
          Nuestro propósito es claro: convertir lo ordinario en algo extraordinario, cuidando cada tono, contraste y matiz para lograr imágenes de alto impacto.
        </p>
        <blockquote className="text-custom-orange italic font-medium text-2xl md:text-3xl mt-12 border-l-4 border-custom-orange pl-4 md:pl-6 animate-fadeIn" style={{animationDelay: '1000ms'}}>
          "Aquí, el color no es solo nuestra firma, es nuestra esencia."
        </blockquote>
      </div>
    </div>
  )
}
