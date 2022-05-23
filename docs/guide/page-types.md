# Page Types

## Naming

### <EssentialIcon /> Use a Naming Convention for Page Types

- Follow a naming convention for Page Types
  - Suffix Page Types based on their purpose (Page, Content, Group, Container)
- Page Type Display Names should match Code Names

**Why?**

While most content managers will focus on the name of pages rather than the types of those pages, developers will frequently use the generated Page Type classes in their code.
It's helpful to quickly identify how a Page Type is used and what
it represents in the Content Tree without having to read its list
of fields or its location in the Tree.

**Why?**

Namespaces in .NET applications often match the [name of the feature](./project-setup-and-configuration#feature-folders-Vertical-slice-architecture) and Page Types in Xperience also represent a feature of the site.
Adding a suffix to the Page Type will prevent the name of the Page Type conflicting with the name of a namespace.
In the example below, we would have a compilation error if the `HomePage` Page Type was instead named `Home` because the namespace has a segment with the same value (`Sandbox.Features.Home`):

```csharp
namespace Sandbox.Features.Home;

public HomeController : Controller
{
   //

   public IActionResult Index()
   {
      if (contextRetriever.TryRetrieve<HomePage>(out var data))
      {
         // ...
      }
   }
}
```

**Why?**

Xperience already differentiates Page Types by whether or not [they have the "URL" feature](https://docs.xperience.io/developing-websites/defining-website-content-structure/managing-page-types/creating-page-types#Creatingpagetypes-Step2–Features). Since this feature cannot be change for Page Types after they have Pages in the Content Tree, its safe to name a Page Type using a convention that expresses if this feature is enabled.

Example:

> <NoteIcon /> Examples:
>
> - **CompanyProfilePage** for a Page with content about the site's business, but also has a unique URL and can be routed to, like `/company`.
> - **VideoContent** for a Page that contains a link to a video, or an embed code and is displayed on other navigable Pages, but has no unique URL.
> - **VideoContentGroup** for a Page that might have custom content, but primarily serves as a container to organize **VideoContent** Pages, and also has no unique URL.
> - **ProductPagesContainer** for a Page that has no custom fields, is not navigable by URL and only serves to organize **ProductPage** Pages in the Content Tree.

### <EssentialIcon /> Use a Naming Convention for Page Type Fields

- Follow a naming convention for Page Type fields
  - Prefix fields with the name of the Page Type
- Use the same conventions across all Page Types in a site
- [Base Page Type](#use-a-base-page-type-for-navigable-pages) fields can be an exception

**Why?**

Creating a naming convention for Page Type fields isn't necessarily required since the generated Page Type classes will ensure developers access Page fields through strongly typed data access properties, however following a naming convention can make the use of these generated classes more ergonomic.

The `.Fields` property on all pages will expose the custom fields of each Page Type, with the Page Type name automatically removed.

Example: The `HomePage` Page Type has a field `HomePageTitle` and can be accessed through the `page.Fields.Title` property. If it were instead named `HomeTitle`, then the auto-generated class would expose this value through `page.Fields.HomeTitle`.

**Why?**

Performing SQL JOINs can be easier when each Page Type has a fully qualified name
that can't conflict with the name of any other table columns.

### <ConsiderIcon /> Favor Verbosity in Page Type Field Names

- Fields referencing other Pages in the Content Tree using the `Guid` data type and `Pages` Form Control should end in `NodeGUID`.
- Fields referencing Media in the Media Library using the `Text` data type and a Media/URL Selector Form Control should end in `MediaFilePath`.
- Fields using the `Long Text` data type and using the Rich Text Form Control should end in `HTML`.

**Why?**

Xperience has a lot of flexibility in Page Type field data types and Form Controls and it's not always clear exactly what is in a specific field. Using a verbose name makes it clear how that field is intended to be used.

**Why?**

When rendering Rich Text in an ASP.NET Core application, we should always wrap
it in an `HtmlString` so that it is not encoded when rendered. The generated Page Type classes use the `string` type for both these Rich Text fields and simple text fields.
The `HTML` suffix makes it clear that this value should not be encoded when rendered.

## Content Management Experience

### <EssentialIcon /> Use Page Type Icons

- Use Page Type icons

### <EssentialIcon /> Use Page Type Field Descriptions and Explanation Text

- Set Page field descriptions and explanation text to aid Content Managers

### <ConsiderIcon /> Remove Pages Types from Allowed Pages

### <ConsiderIcon /> Set Helpful Default Values for Page Type Fields

- Set default field values to guide Content Managers

### <EssentialIcon /> Use Page Type Field Conditional Visibility

- Use conditional visibility of Page Type fields to guide Content Managers

### <ConsiderIcon /> Use Page Type Field Categories

- Use Page Type field categories to organize fields

## Features

### <EssentialIcon /> Use Custom Navigation Page Types

- Do not use the Navigation Feature (except for simple sites)

### <EssentialIcon /> Enable Features for Navigable Pages

- Always enable the Page Builder / Routing / Metadata for navigable Pages

### <EssentialIcon /> Use a Base Page Type for Navigable Pages

- Use "Base" Page Type for common fields
  - Store common fields in DocumentCustomData
