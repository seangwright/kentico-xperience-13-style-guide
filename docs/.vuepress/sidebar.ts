import type {
  SidebarConfig,
  SidebarGroupCollapsible,
} from '@vuepress/theme-default';

export function generateSidebar(): SidebarConfig {
  const guideItems: SidebarGroupCollapsible[] = [
    {
      text: 'Guide',
      children: [
        '/guide/README.md',
        '/guide/project-setup-and-configuration.md',
        '/guide/aspnet-core.md',
        '/guide/content-modeling.md',
        '/guide/page-types.md',
        '/guide/page-builder.md',
        '/guide/querying.md',
        '/guide/rendering.md',
        '/guide/platform-customization.md',
        '/guide/search.md',
      ],
    },
  ];

  return {
    '/guide/': guideItems,
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
