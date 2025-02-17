import { routes } from '../config/routes'

const route = routes.find(r => r.path === '/reel')
const Component = route.component

export const metadata = route.metadata

export default function Page() {
  return <Component />
}