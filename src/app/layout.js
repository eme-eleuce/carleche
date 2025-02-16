'use client'
import { Indie_Flower } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { usePathname } from 'next/navigation'

const indie_flower = Indie_Flower({
  subsets: ['latin'], // Subconjuntos de caracteres (opcional)
  weight: ['400'], // Pesos de la fuente
  variable: '--font-indie-flower', // Variable CSS para usar la fuente
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
      <body className={indie_flower.className}>
        <Navbar />
        <main>
          {children}
        </main>
        {!isHomePage && <Footer />}
      </body>
    </html>
  );
}
