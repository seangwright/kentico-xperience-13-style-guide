import type { SidebarConfig } from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { readdirSync } from 'fs';

export function generateSidebar(): SidebarConfig {
  const guidePath = path.resolve(__dirname, '../guide/');

  const files = readdirSync(guidePath);

  return {
    '/guide/': [
      {
        text: 'Guide',
        children: files
          .sort(readmeFirstThenAlphabetical)
          .map((f) => `/guide/${f}`),
      },
    ],
  };
}

function readmeFirstThenAlphabetical(
  first: string,
  second: string
): -1 | 0 | 1 {
  return first === 'README.md'
    ? -1
    : second === 'README.md'
    ? 1
    : first > second
    ? 1
    : -1;
}
