import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { defaultTheme } from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { defineUserConfig, viteBundler } from 'vuepress';
import { head } from './head';
import { generateNavbar } from './navbar';
import { generateSidebar } from './sidebar';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig({
  base: '/kentico-xperience-13-style-guide/',

  lang: 'en-US',
  title: 'Kentico Xperience 13 Community Style Guide',
  description:
    'The result of observations that the Kentico Xperience community has on building applications with Xperience',

  head: head(),

  theme: defaultTheme({
    logo: '/images/kx-logo-by-kentico-hor-color-pos-sz-rgb.png',
    repo: 'seangwright/kentico-xperience-13-style-guide',
    docsDir: 'docs',
    navbar: generateNavbar(),
    sidebar: generateSidebar(),

    editLink: true,
    editLinkText: 'Edit this page on GitHub',

    themePlugins: {
      git: isProd,
    },
  }),

  bundler: viteBundler({}),

  plugins: [
    googleAnalyticsPlugin({ id: 'abc' }),
    docsearchPlugin({
      appId: '',
      apiKey: '3a539aab83105f01761a137c61004d85',
      indexName: 'vuepress',
      searchParameters: {
        facetFilters: ['tags:v2'],
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
  ],
});
