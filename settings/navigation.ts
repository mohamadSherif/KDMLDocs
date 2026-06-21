import { PageRoutes } from '@/lib/pageroutes'

export const Navigations = [
  {
    title: 'Docs',
    href: `/docs${PageRoutes[0].href}`,
  },
  {
    title: 'Data Lab',
    href: '/docs/blog',
  },
  {
    title: 'KDMLink',
    href: 'https://kdmlink.com',
    external: true,
  },
]

export const GitHubLink = {
  href: 'https://github.com/kdmlink',
}
