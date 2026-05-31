import { type Paths } from '@/lib/pageroutes'

export const Documents: Paths[] = [
  {
    heading: 'Getting Started',
    title: 'Introduction',
    href: '/introduction',
  },
  {
    title: 'Installation',
    href: '/installation',
    items: [
      {
        title: 'N-Link Hardware',
        href: '/n-link',
      },
      {
        title: 'App Install & Setup',
        href: '/app',
      },
    ],
  },
  {
    spacer: true,
  },
  {
    heading: 'The App',
    title: 'Overview',
    href: '/app',
  },
]
