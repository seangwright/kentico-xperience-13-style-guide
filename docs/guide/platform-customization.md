# Platform Customization

## Custom Modules

### <EssentialIcon /> Define At Most One Custom Module Per Object Type for Global Event handling

- Create a single [Custom Module](https://docs.xperience.io/custom-development/creating-custom-modules) to handle [global events](https://docs.xperience.io/custom-development/handling-global-events/reference-global-system-events) for a type (custom module Class, system type, Page type)
- Register event handlers
- Organize module by feature

**Why?**

Since Global Events can be handled in any Custom Module class, the logic for handling these events can accidentally be spread
all over a code base. By creating one Custom Module per Object Type, we centralize handling for events for those objects.

**Why?**

Centralized event handling is easier to debug and abides by the [principle of lease surprise](https://ardalis.com/principle-of-least-surprise/) because disabling a single module should disable all custom event handling for that object type.

### <ConsiderIcon /> Single Module for All Document and Workflow Events

- Create a single [Custom Module](https://docs.xperience.io/custom-development/creating-custom-modules) class
- Include this class in a shared library for both Administration and Live Site applications
- Factor out specific Page Type event handling to separate non-static classes

**Why?**

Updates to Pages can happen in the Live site application (ex: using the Page Builder) and the Administration application
(ex: updating the Content tab of a Page), so if we want global [document](https://docs.xperience.io/custom-development/handling-global-events/reference-global-system-events#ReferenceGlobalsystemevents-DocumentEvents) and [workflow](https://docs.xperience.io/custom-development/handling-global-events/reference-global-system-events#ReferenceGlobalsystemevents-WorkflowEvents) events to always be handled, the code needs to be shared by both applications.

**Why?**

Global events call their handlers in the order that they were registered, but this order can be very difficult to predict
when event handlers are registered in different [Custom Modules](https://docs.xperience.io/custom-development/creating-custom-modules).
This becomes an issue when multiple event handlers might modify the same Page for a single Page event.

To make the order of executing of event handlers more predictable, register them all in a single class.

```csharp
[assembly: RegisterModule(typeof(PageGlobalEventsModule))]

namespace Sandbox.Xperience.Common
{
    public class PageGlobalEventsModule : Module
    {
        public PageGlobalEventsModule() : base(nameof(PageGlobalEventsModule)) { }

        protected override void OnInit()
        {
            base.OnInit();

            DocumentEvents.Insert.Before += Insert_Before;
            DocumentEvents.Delete.Before += Delete_Before;
            WorkflowEvents.SaveVersion.Before += SaveVersion_Before;
        }

        private void Insert_Before(object sender, DocumentEventArgs e)
        {
            new HomePageEventsHandler().Insert_Before(sender, e);
            new PublicPageEventsHandler(Log).Insert_Before(sender, e);
            new NavigationPageEventsHandler().Insert_Before(sender, e);
        }

        private void Delete_Before(object sender, DocumentEventArgs e)
        {
            // ...
        }

        private void SaveVersion_After(object sender, WorkflowEventArgs e)
        {
            // ...
        }

        private IEventLogService Log => Service.Resolve<IEventLogService>();
    }
}
```

**Why?**

Event handler classes can be created for each Page Type (or each group of Page Types) and organized with those generated Page Type classes to make them easy to find. Making these handler methods non-static will also make them more testable and help avoid captured global state (`static` class fields or properties):

```csharp
namespace Sandbox.Xperience.Common
{
    public class PublicPageEventsHandler
    {
        private readonly IEventLogService log;

        public PublicPageEventsHandler(IEventLogService log) => this.log = log;

        public void Insert_Before(object sender, DocumentEventArgs e)
        {
            if (!IsValidDocument(e.Node))
            {
                return;
            }

            SetDefaultValues(e.Node);
        }

        public void Update_Before(object sender, DocumentEventArgs e)
        {
            if (!IsValidDocument(e.Node))
            {
                return;
            }

            SetDefaultValues(e.Node);
        }

        private void SetDefaultValues(TreeNode node)
        {
            if (!node.HasMetadata())
            {
                return;
            }

            // Set DocumentPageTitle and DocumentPageDescription fields from base page fields

            // ...
        }

        private bool IsValidDocument(TreeNode node) =>
            DataClassInfoProvider
                .GetDataClassInfo(node.ClassName)
                ?.ClassInheritsFromClassID == DataClassInfoProvider
                    .GetDataClassInfo(PublicPage.CLASS_NAME)
                    ?.ClassID;
        }
    }
}
```

### <ConsiderIcon /> Encapsulate 'Well Known' System Objects in an Immutable Class

- Create an immutable class to hold the identifiers for the system object identifiers and names
- Add static properties for each well known object
- Add an `All` object to contain the set of all static property instances of the class

```csharp
public class TopLevelPage
{
    public static TopLevelPage Home { get; } = new TopLevelPage(new Guid("..."));
    public static TopLevelPage ContactUs { get; } = new TopLevelPage(new Guid("..."));
    public static TopLevelPage Products { get; } = new TopLevelPage(new Guid("..."));

    public static TopLevelPage[] All { get; } = new[]
    {
        Home,
        ContactUs,
        Products
    };

    protected TopLevelPage(Guid nodeGUID) => NodeGUID = nodeGUID;

    public Guid NodeGUID { get; }
}
```

**Why?**

`Guid` values are stable across environments, so they are safe to hardcode into an application.
Surrounding this value in an immutable class (one with a `protected` constructor and non-writable properties) ensures
these values are not accidentally changed by the application and gives them friendly names for developers to refer to them by.

**Why?**

Creating an `All` property makes it easy to programmatically check all the static class instance properties. This is helpful
for guarding against accidental deletion of objects the application requires to function correctly (see [Protect Required Data from Deletion](#protect-required-data-from-deletion))

::: tip

For an example and more detailed explanation, see the blog post [Kentico Xperience Design Patterns: Protecting Hard Coded Identifiers](https://dev.to/seangwright/kentico-xperience-design-patterns-protecting-hard-coded-identifiers-4f88) and NuGet package [Xperience Page Link Tag Helpers](https://github.com/wiredviews/xperience-page-link-tag-helpers/).

:::

### <EssentialIcon /> Protect Required Data from Deletion

- In a [Custom Module](https://docs.xperience.io/custom-development/creating-custom-modules) handle the Delete [Global Events](https://docs.xperience.io/custom-development/handling-global-events/reference-global-system-events) for a type that the system depends on
- Check if the object can safely be deleted
- Cancel the event and throw an exception if it cannot be deleted

```csharp
[assembly: RegisterModule(typeof(PageGlobalEventsModule))]

namespace Sandbox.Xperience.Common
{
    public class PageGlobalEventsModule : Module
    {
        public PageGlobalEventsModule() : base(nameof(PageGlobalEventsModule)) { }

        protected override void OnInit()
        {
            base.OnInit();

            DocumentEvents.Delete.Before += Delete_Before;
        }

        private void Delete_Before(object sender, DocumentEventArgs e)
        {
            if (TopLevelPage.All.Any(p => p.NodeGUID == e.Document.NodeGUID))
            {
                e.Cancel();

                throw new Exception(
                    $"Cannot delete Page [{e.Document.DocumentName}] because it is required by the application.")
            }
        }
    }
}
```

**Why?**

It's often necessary to depend on specific Settings, Pages, Custom Module record, Relationship Types, and Categories in an applications. Identifiers (code name or GUID) are often hard-coded in an application code base to make referring to this
data easier.

We need to prevent this data from being deleted accidentally and Global Events provide the most convenient way to intercept
the deletion process and stop if the data needs to exist for the site to function properly.

**Why?**

Throwing an exception after canceling the deletion event will add an event in the Event Log explaining
why the object could not be deleted. The message of the exception will also be displayed in the Administration
application for content mangers to view.

## Custom Providers

- Centralizes customizations
- Inheritance model means composition is difficult

### <ConsiderIcon /> Register Xperience Customizations in applications

- Create a dependency management class in each application project.
- When creating Custom Modules, Providers, or Decorated services, register them in a single place in each Application project (the dependency class).
- Avoid registering these types in the same file they are defined in, and also in any library project.

```csharp
// Library/MyModule.cs
namespace Sandbox.Xperience.Common
{
    public class MyModule : Module
    {
        public MyModuleModule() : base(nameof(MyModuleModule)) { }

        protected override void OnInit()
        {
            base.OnInit();

            // ...
        }
    }
}
```

```csharp
// App/Configuration/XperienceDpendencies.cs
[assembly: RegisterModule(typeof(MyModule))]
[assembly: RegisterModule(typeof(...))]
[assembly: RegisterModule(typeof(...))]
```

**Why?**

Kentico Xperience's [custom modules](https://docs.xperience.io/custom-development/creating-custom-modules/initializing-modules-to-run-custom-code) are a powerful tool for customizing the platform. These types, along with [custom providers](https://docs.xperience.io/custom-development/customizing-providers) and [decorated system services](https://docs.xperience.io/custom-development/decorating-system-services) give developers plenty of flexibility for customizations. However, we cannot 'register' these customizations using the same dependency injection (DI) approach as we do with an ASP.NET Core application.

**Why?**

Xperience has its own DI container interally and this container initializes itself _before_ ASP.NET Core - during the custom module `PreInit()` method call, so we cannot customize types in this container without using its API - the `[assembly: ...]` attribute.

These [attributes](https://docs.xperience.io/custom-development/customizing-providers/registering-providers-using-assembly-attributes) are often displayed above the class that is being registered. If this class is in a class library, any consumer (like a console app) of this class library will automatically have all types registered that are defined in the library - there's no way to opt-out.

**Why?**

By defining type registerations in an application, we leave it up to each library consumer to choose if they want to include a customization. Yes, this means enabling a customization takes more work, but it provides signficantly more flexibility. This also means consuming applications can compose/fully replace a customization.

**Why?**

Creating a dependency management class in each project provides a central location to check for and register all Kentico Xperience related dependencies.
