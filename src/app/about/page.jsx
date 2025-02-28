import { routes } from '../config/routes'

const route = routes.find(r => r.path === '/about')
const Component = route.component

export const metadata = route.metadata

export default function Page() {
  return (
    <main className="pt-32">
      <Component />
    </main>
  )
} 