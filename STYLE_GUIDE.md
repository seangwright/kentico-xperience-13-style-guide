# Style Guide

Each recommendation can be categorized in 1 of 2 ways:

- ✔ Essential: These are things a developer should always do.

- 🔶 Consider: These are things a developer should consider.

These recommendations will always include an explanation of **why** it is in the guide. They will include examples of what it would help the developer avoid ❌ and what following the recommendations might look like in practice.

We don't provide any recommendation from the perspective of what should be avoided, since we want to always give a developer _solutions_ and not _impediments_.

> Throughout this guide we also include Notes 📌 with more detailed explanations of a recommendation.

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
