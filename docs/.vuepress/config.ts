import type {
  DefaultThemeOptions,
  NavbarConfig,
  SidebarConfig,
} from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { defineUserConfig } from 'vuepress';
import { generateSidebar } from './auto-sidebar';

const isProd = process.env.NODE_ENV === 'production';

const navbar: NavbarConfig = [
  {
    text: 'Guide',
    link: '/guide/',
  },
];

export const sidebar: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: [
        '/guide/README.md',
        '/guide/aspnet-core.md',
        '/guide/caching.md',
        '/guide/content-modeling.md',
        '/guide/page-types.md',
        '/guide/project-setup-and-configuration.md',
        '/guide/querying.md',
        '/guide/rendering.md',
      ],
    },
  ],
};

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',

  lang: 'en-US',
  title: 'Kentico Xperience 13 Community Style Guide',
  description:
    'The result of observations that the Kentico Xperience community has on building applications with Xperience',

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/images/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/images/icons/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'VuePress' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'VuePress' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/images/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],

  themeConfig: {
    logo: '/images/kx-logo-by-kentico-hor-color-pos-sz-rgb.png',
    repo: 'seangwright/kentico-xperience-13-style-guide',

    docsDir: 'docs',

    navbar,
    sidebar: generateSidebar(),

    editLink: true,
    editLinkText: 'Edit this page on GitHub',

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
    },
  },

  bundler:
    // specify bundler via environment variable
    process.env.DOCS_BUNDLER ??
    // use vite in dev, use webpack in prod
    (isProd ? '@vuepress/webpack' : '@vuepress/vite'),

  plugins: [
    ['@vuepress/plugin-debug'],
    [
      '@vuepress/plugin-docsearch',
      {
        apiKey: '3a539aab83105f01761a137c61004d85',
        indexName: 'vuepress',
        searchParameters: {
          facetFilters: ['tags:v2'],
        },
      },
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        // we have multiple deployments, which would use different id
        id: 'abc',
      },
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    // only enable shiki plugin in production mode
    [
      '@vuepress/plugin-shiki',
      isProd
        ? {
            theme: 'dark-plus',
          }
        : false,
    ],
  ],
});
