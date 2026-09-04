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
    items: [
      {
        title: 'Pairing & Connecting',
        href: '/pairing',
        items: [
          {
            title: 'Re-pairing & Reconnecting',
            href: '/repairing',
          },
        ],
      },
      {
        title: 'Home Dashboard',
        href: '/dashboard',
        items: [
          {
            title: 'Octane Learning',
            href: '/octane-learning',
          },
        ],
      },
      {
        title: 'Live Race Dashboard',
        href: '/live',
      },
      {
        title: 'Sessions',
        href: '/sessions',
      },
      {
        title: 'RaceChrono Integration',
        href: '/racechrono',
      },
    ],
  },
  {
    spacer: true,
  },
  {
    heading: 'Data Lab',
    title: 'Articles',
    href: '/blog',
    items: [
      {
        title: 'EK1 Pro vs. KDMLink',
        href: '/ek1-pro-vs-kdmlink',
      },
    ],
  },
]
