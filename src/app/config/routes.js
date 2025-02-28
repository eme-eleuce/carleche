import About from '../components/About'
import Contact from '../components/Contact'
import Showcase from '../components/proyectos/Showcase'
import Reel from '../components/Reel'
// Importa otros componentes aquí

export const routes = [
  {
    path: '/proyectos',
    component: Showcase,
    title: 'Proyectos',
    metadata: {
      title: 'Proyectos | Carleche',
      description: 'Proyectos de Carleche Editor - Color Grading'
    }
  },
  {
    path: '/reel',
    component: Reel,
    title: 'Reel',
    metadata: {
      title: 'Reel | Carleche',
      description: 'Video reel de Carleche Editor - Color Grading'
    }
  },
  {
    path: '/about',
    component: About,
    title: 'Nosotros',
    metadata: {
      title: 'Nosotros | Carleche',
      description: 'Conoce a Carleche Editor - Color Grading'
    }
  },
  {
    path: '/contact',
    component: Contact,
    title: 'Contacto',
    metadata: {
      title: 'Contacto | Carleche',
      description: 'Contacto via Whatsapp o Instagram'
    }
  },
] 