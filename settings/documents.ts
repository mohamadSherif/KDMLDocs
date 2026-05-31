import { type Paths } from '@/lib/pageroutes'

export const Documents: Paths[] = [
  {
    heading: 'Getting Started',
    title: 'Introduction',
    href: '/introduction',
  },
  {
    title: 'Compatible Vehicles',
    href: '/compatible-vehicles',
  },
  {
    title: 'Installation',
    href: '/installation',
    items: [
      {
        title: 'N-Link Hardware',
        href: '/n-link',
        items: [
          {
            title: 'Plug and Play',
            href: '/plug-and-play',
          },
          {
            title: 'Wire Tap',
            href: '/wire-tap',
          },
        ],
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
