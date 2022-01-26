import type { DefaultThemeOptions } from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { defineUserConfig } from 'vuepress';
import { head } from './head';
import { themeConfig } from './themeConfig';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',

  lang: 'en-US',
  title: 'Kentico Xperience 13 Community Style Guide',
  description:
    'The result of observations that the Kentico Xperience community has on building applications with Xperience',

  head: head(),

  themeConfig: themeConfig(isProd),

  bundler:
    // specify bundler via environment variable
    process.env.DOCS_BUNDLER ??
    // use vite in dev, use webpack in prod
    (isProd ? '@vuepress/webpack' : '@vuepress/vite'),

  plugins: [
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
