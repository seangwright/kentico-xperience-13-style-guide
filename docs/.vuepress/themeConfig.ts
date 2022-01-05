import { ThemeConfig } from 'vuepress-vite';
import { generateNavbar } from './navbar';
import { generateSidebar } from './sidebar';

export function themeConfig(isProd: boolean): ThemeConfig {
  return {
    logo: '/images/kx-logo-by-kentico-hor-color-pos-sz-rgb.png',
    repo: 'seangwright/kentico-xperience-13-style-guide',

    docsDir: 'docs',

    navbar: generateNavbar(),
    sidebar: generateSidebar(),

    editLink: true,
    editLinkText: 'Edit this page on GitHub',

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
    },
  };
}
