# Page Types

## Naming

### <EssentialIcon /> Use a Naming Convention for Page Types

- Follow a naming convention for Page Types
  - Suffix Page Types based on their purpose (Page, Content, Group, Container)

### <EssentialIcon /> Use a Naming Convention for Page Type Fields

- Follow a naming convention for Page Type fields
  - Prefix fields with the name of the Page Type

## Features

## Content Management Experience

- Use Page Type icons
- Do not use the Navigation Feature (except for simple sites)
- Always enable the Page Builder / Routing / Metadata for navigable Pages
- Set default field values to guide Content Managers
- Set Page field descriptions and explanation text to aid Content Managers
- Use conditional visibility of Page Type fields to guide Content Managers
- Use Page Type field categories to organize fields
- Use "Base" Page Type for common fields
  - Store common fields in DocumentCustomData

## Custom Page Types

### 🔶 Page Type Code Names

**Do** name Page Type with a _suffix_ that describes the Page's _purpose_.

**Do** use conventions like **\*Page** for routable Pages, **\*Content** for Pages that are content-only, and **\*Group** for Pages that act as containers for other content-only Pages.

**Why?** Page Type names determine the auto-generated Page Type C# class names used throughout Kentico Xperience applications.

**Why?** Consistent suffixes will help identify classes that represent Pages in the Content Tree, which inherit from the `TreeNode` class.

**Why?** Some Pages in the Content Tree are content-only and don't have their own URL on a site, whereas other Pages will have a unique URL and can be navigated to.

> 📌 Examples:
> **CompanyProfilePage** for a Page with content about the site's business, but also has a unique URL and can be routed to via `/company`.
> **VideoContent** for a Page that contains a link to a video, or an embed code and is displayed on other routable Pages, but has no unique URL.
> **VideoContentGroup** for a Page that might have custom content, but also serves as a container for **VideoContent** Pages, and has no unique URL.
