import type {
  SidebarConfig,
  SidebarGroupCollapsible,
} from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { readdirSync } from 'fs';

export function generateSidebar(): SidebarConfig {
  const guidePath = path.resolve(__dirname, '../guide/');

  const files = readdirSync(guidePath);

  const items: SidebarGroupCollapsible[] = [
    {
      text: 'Guide',
      collapsible: true,
      children: files
        .sort(readmeFirstThenAlphabetical)
        .map((f) => `/guide/${f}`),
    },
  ];

  return {
    '/guide/': items,
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
