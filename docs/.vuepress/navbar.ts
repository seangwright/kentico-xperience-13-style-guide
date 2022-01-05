import type { NavbarConfig } from '@vuepress/theme-default';

export function generateNavbar(): NavbarConfig {
  return [
    {
      text: 'Guide',
      link: '/guide/',
    },
    {
      text: 'DevNet',
      link: 'https://devnet.kentico.com/',
    },
    {
      text: 'Kentico Resources',
      link: 'https://github.com/Kentico/Home/blob/master/RESOURCES.md',
    },
  ];
}
