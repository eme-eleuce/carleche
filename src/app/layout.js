import { Outfit } from "next/font/google";
import "./globals.css";
import LayoutContent from './LayoutContent';

const outfit = Outfit({
  subsets: ['latin'], // Subconjuntos de caracteres (opcional)
  weight: ['400'], // Pesos de la fuente
});

export const metadata = {
  title: 'Carleche | Editor & Color Grading',
  description: 'Especialistas en postproducción audiovisual y color grading. Transformamos historias a través del color, creando experiencias visuales únicas y de alto impacto.',
  keywords: 'color grading, postproducción, edición de video, corrección de color, Carleche, editor profesional, postproducción audiovisual, colorista, editor de video profesional, servicios de edición',
  metadataBase: new URL('https://carleche.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/',
    },
  },
  openGraph: {
    title: 'Carleche - Editor & Color Grading',
    description: 'Especialistas en postproducción audiovisual y color grading. Transformamos historias a través del color.',
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'Carleche - Editor & Color Grading',
    images: [
      {
        url: '/icon1.png',
        width: 1200,
        height: 630,
        alt: 'Carleche - Editor & Color Grading',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carleche - Editor & Color Grading',
    description: 'Especialistas en postproducción audiovisual y color grading',
    creator: '@carleche',
    images: [{
      url: '/icon1.png',
      alt: 'Carleche - Editor & Color Grading',
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={outfit.className}>
      <body>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}