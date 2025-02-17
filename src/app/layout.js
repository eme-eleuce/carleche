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
    <html lang="en">
      <head>
        <title>Carleche</title>
        <meta name="description" content="Building" />
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
