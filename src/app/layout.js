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
  keywords: 'color grading, postproducción, edición de video, corrección de color, Carleche, editor profesional',
  metadataBase: new URL('https://carleche.com'),
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
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carleche - Editor & Color Grading',
    description: 'Especialistas en postproducción audiovisual y color grading',
    images: ['/icon1.png'],
  },
  robots: {
    index: true,
    follow: true,
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