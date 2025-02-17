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
      description: 'Proyectos de Carleche Productions'
    }
  },
  {
    path: '/reel',
    component: Reel,
    title: 'Reel',
    metadata: {
      title: 'Reel | Carleche',
      description: 'Video reel de Carleche Productions'
    }
  },
  // Puedes agregar más rutas aquí
] 