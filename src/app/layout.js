'use client'
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { usePathname } from 'next/navigation'

const font = Outfit({
  subsets: ['latin'], // Subconjuntos de caracteres (opcional)
  weight: ['400'], // Pesos de la fuente
  variable: '--font-outfit', // Variable CSS para usar la fuente
});

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Especialistas en postproducción audiovisual y color grading. Transformamos historias a través del color, creando experiencias visuales únicas y de alto impacto." />
        <meta name="keywords" content="color grading, postproducción, edición de video, corrección de color, Carleche, editor profesional" />
        <title>Carleche | Editor & Color Grading</title>
        <meta property="og:title" content="Carleche - Editor & Color Grading" />
        <meta property="og:description" content="Especialistas en postproducción audiovisual y color grading. Transformamos historias a través del color." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content="https://carleche.com" />
        <meta property="og:site_name" content="Carleche - Editor & Color Grading" />
        <meta property="og:image" content="/icon1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Carleche - Editor & Color Grading" />
        <meta name="twitter:description" content="Especialistas en postproducción audiovisual y color grading" />
        <meta name="twitter:image" content="/icon1.png" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={font.className}>
        <Navbar />
        <main>
          {children}
        </main>
        {!isHomePage && <Footer />}
      </body>
    </html>
  );
}