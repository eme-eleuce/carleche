import Project_details from '@/app/components/proyectos/Project_details'

export default async function ProjectPage({ params }) {
  const { id } = await params

  return (
    <main className="pt-32">
      <Project_details projectId={id} />
    </main>
  )
}

// Opcional: Generar rutas estáticas si lo necesitas
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    // ... agrega más IDs según tus proyectos
  ]
} 