# Project Setup and Configuration

These recommendations focus on the .NET Solution structure and individual project configuration.

## Documentation

### <EssentialIcon /> Add a Repository README.md

- Add a `README.md` to the root of your repository
- Write a brief description of the project
- Detail steps to get the project running for local development

**Why?**

New developers on the project will reference a `README.md` to orient themselves in the project. Setup instructions will help them troubleshoot working on the application.

**Why?**

Having project information in a `README.md` that exists in the project's repository (co-located) increases the likihood of the information
being kept up to date as the project changes.

### <ConsiderIcon /> Enhance the README.md

- Create a table that lists the details of Web and Database Server details for each environment
- List project features / integrations
- Link to other project documentation
  - [Maintain Architectural Decision Records (ADR)](#maintain-architectural-decision-records-adr)
  - [Commit SQL scripts](#commit-sql-scripts)

**Why?**

Environment information (URLs, Server Names) is often implicit knowledge on a team. Detailing this in the project `README.md` makes it discoverable and maintainable, reducing information silos.

**Why?**

A list of features and integrations is a good high level substitute for package and infrastructure dependencies in an application. This list often shows what the volatile dependencies and complex areas of an application are.

### <ConsiderIcon /> Maintain Architectural Decision Records (ADR)

::: tip What is an Architectural Decision Record?
An Architectural Decision (AD) is a software design choice that addresses a functional or non-functional requirement that is architecturally significant. _[https://adr.github.io/](https://adr.github.io/)_

---

An Architecture Decision Record is a tool for documenting a decision that has been made (or is under discussion) related to the architecture of a particular system or application. _[https://ardalis.com/getting-started-with-architecture-decision-records/](https://ardalis.com/getting-started-with-architecture-decision-records/)_
:::

- Create an `ADR.md` file in the root of your project's repository
- Add a dated entry as a record of each significant architecture addition or change
- Include the entry as part of a code review process

**Why?**

Business rule and project requirement changes are often recorded by project management or stakeholders, but the impact that these changes have on an application can easily be forgotten. An `ADR` file encourages recording a history of changes that developers can consult in the future to better understand decisions made in the past.

**Why?**

An ADR entry should include details about an architectural decision. If there were multiple solutions available, the entry shouldd describe each one, including their pros/cons, and why the chosen solution was selected. Writing out this decision making process can help reflect on the _why_ of a change and expressing explicitly any implications of the solution.

### <ConsiderIcon /> Add XML Doc Comments

- Use the [powerful XML doc comment syntax](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags) to annotate types, methods, and properties

**Why?**

Swagger API documentation for HTTP/REST APIs has become a standard in most enterprise web applications. XML doc comments helps to make these auto-generated pages [more useful with human readable descriptions](https://github.com/domaindrivendev/Swashbuckle.AspNetCore#include-descriptions-from-xml-comments).

**Why?**

A type name can give a developer a hint as to _what_ a type is (ex: `IPageRetriever`), but the name alone might not indicate _when_ or _why_ a type or method should be used. XML doc comments are a great place to add these explanations. Comments that clearly describe what something is and why it exists, while avoiding describing _how_ it works, can help developers using those types and methods from needing to explore the source code.

**Why?**

Method overloading is a useful C# feature, but variations on parameter lists can
be difficult to understand without XML doc comments detailing what parameters are used for.

**Why?**

Proper use of XML doc comments can be refactor-proof when refering to other code as symbols instead of strings (ex `<see cref="SomeType" />`).

```csharp
/// <summary>
/// Validates URls based on the configuration supplied by <see cref="URLConfiguration" />
/// </summary>
public class URLValidator
{
    private readonly URLConfiguration config;

    public URLValidator(IOptions<URLConfiguration> config) =>
      this.config = config.Value;

    // more methods
}
```

::: tip
In the above code, renaming `URLConfiguration` using Visual Studio's refactoring feature (`f2`) will ensure the XML doc comment
on `URLValidator` has the referenced type renamed as well.
:::

### <EssentialIcon /> Commit SQL Scripts

- Create a documentation folder in the repository and add dated SQL scripts to it
- These scripts should be documented with comments and detail one time data migrations or imports
- They can be linked to from an [ADR](#maintain-architectural-decision-records-adr)

**Why?**

The impact of changes to the database are not visible through source control, so it can be difficult to determine when or why changes to data/schema were made from SQL. Commited scripts help match these changes with related code changes at a given point in time.

**Why?**

Data imports might need to be re-executed in the future, or in multiple environments. Having these scripts recorded means they don't need to be re-written from scratch.

**Why?**

Scripts in source control can be validated during a code-review _before_ they are executed in a live environment.

## .NET and C\#

### <EssentialIcon /> Use the Latest Target Frameworks for Applications

- Target .NET 6.0 for Kentico Xperience 13 (latest version as of 2022/01)
  - [Compatibility and requirements](https://docs.xperience.io/developing-websites/developing-xperience-applications-using-asp-net-core#DevelopingXperienceapplicationsusingASP.NETCore-Requirements)

**Why?**

Kentico Xperience 13 supports ASP.NET MVC 5 and ASP.NET Core 3.1, 5.0, and 6.0.
MVC 5 development should be avoided for any greenfield project. ASP.NET Core 6.0 offers the most features and best performance without any limitations for Kentico Xperience.

**Why?**

Kentico Xperience 13's product model includes [regular refreshes](https://xperience.io/discover/blog/kentico-xperience-13-refreshes-small-steps-for-the) to the platform. To get the latest features, developers will need to regularly apply refreshes and update their custom code to turn on these features. These regular updates are a great opportunity to ensure the latest supported version of .NET is being used.

**Why?**

Microsoft is releasing new version of C# along with new versions of .NET on a yearly cadence. To benefit from the newest language features (ex: [C#10](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-10)), developers need to be on the latest version of .NET.

### <EssentialIcon /> Use .NET Standard 2.0 for Shared Libraries

- Code shared between the Content Management (CMS .NET 4.8 ASP.NET Web Forms) application and the Content Delivery (ASP.NET Core) application needs to target the highest common denominator for both versions of .NET
- `netstandard2.0` provides the most features and best compatibility

**Why?**

Despite the Content Management and Content Delivery apps being built on different eras of technology and serving different purposes, in typical Kentico Xperience 13 projects they will share some code. [Custom module classes](https://docs.xperience.io/custom-development/creating-custom-modules/initializing-modules-to-run-custom-code) and [generated classes for Xperience objects](https://docs.xperience.io/developing-websites/generating-classes-for-xperience-objects) are normally shared between both applications.

**Why?**

.NET 4.x projects cannot be referenced by modern .NET 5/6 projects. The same is true in the other direction. Therefore, `.netstandard2.0` is the most common target framework for code shared between these two versions of .NET.

### <EssentialIcon /> Use SDK-Style Projects

- Create new class libraries using the [.NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/) using the `dotnet new` command or the Visual Studio `File -> New Project` UI.
- Ensure the new class library `.csproj` file beings with `<Project Sdk="Microsoft.NET.Sdk">`

**Why?**

All modern .NET Core/.NET 5+ projects use the SDK-Style Project format which includes [a large number of improvments and new features](https://github.com/dotnet/project-system/blob/main/docs/feature-comparison.md) when compared with the project format of older .NET 4.x projects. Some of these features, like hand editable `.csproj` files that can be edited without 'unloading' projects in Visual Studio, are welcomed conveniences. Others, like properly tracked transitive NuGet package references, make the difference between applications that do and do not function correctly when run. Even `.netstandard2.0` class libraries can use the new SDK-Style projects.

**Why?**

.NET Developers have had a history of being intimidated by `.csproj` files which were meant to be managed by tooling in Visual Studio. SDK-Style projects are meant to be manageable by and approachable to both new and experienced .NET developers.

::: warning

The CMS .NET 4.8 ASP.NET Web Forms application does not support the SDK-Style project format, however [it can support](https://dev.to/seangwright/kentico-12-class-libraries-with-modern-net-core-features-34n5) the modern NuGet `<PackageReference>` syntax.

:::

### <EssentialIcon /> Enable Nullable Reference Types

- Turn on compiler analysis for [nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references) for any project supporting C# 8 or above
- Add `<nullable>enable</nullable>` to a `<PropertyGroup>` in your `.csproj` file to enable nullable reference types
- Add `<WarningsAsErrors>nullable</WarningsAsErrors>` to a `<PropertyGroup>` in your `.csproj` file to treat nullable reference type warnings as compilation errors

**Why?**

One of the most common exceptions developers encounter in their code is the `NullReferenceException`. This typically happens
because of C#'s **implicit** [type union](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) of all [reference types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/reference-types) and the value `null`. The compiler
can't tell the developer that a value might be null before it is used, so developers are forced to add checks themselves. It's easy to forget these checks which leads to the exceptions are runtime.

Enabling nullable reference types makes the type union of reference types and `null` **explicit**, which means the compiler can
alert us when we haven't guarded against `null` values.

**Why?**

Nullable reference types were a C# language feature enhancement to help developers catch errors at compile time. By default, the compiler will
treat missing null checks or nullable type mismatches as warnings, but those defeat the purpose of using the compiler to help us write
more robust code. By having the compiler emit errors instead of warnings, we ensure we are getting the most protection for our
application with this feature.

### <EssentialIcon /> Directory.Build.props / Directory.Build.targets for Shared Configuration

- In the root of your repository, create a `Directory.Build.props` file for shared project configuration
- In the root of your repository, create a `Directory.Build.targets` file for shared project build actions

**Why?**

`Directory.Build.props` and `Directory.Build.targets` are a convenient way to [define common MSBuild properties and behavior](https://docs.microsoft.com/en-us/visualstudio/msbuild/customize-your-build?view=vs-2022#directorybuildprops-and-directorybuildtargets)
in a single location. While these files are most useful in libaries that are shared via NuGet packages, applications can also benefit from them.

Adding the following to a `Directory.Build.props` would enable [nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references) for the entire solution and ensure any nullability warnings are treated as compilation errors:

::: tip Directory.Build.props

```xml
<PropertyGroup>
  <Nullable>enable</Nullable>
  <WarningsAsErrors>nullable</WarningsAsErrors>
</PropertyGroup>
```

:::

**Why?**

If you embed ownership metadata in your compiled assemblies, having to repeat this metadata in every `.csproj` file
can be tedious and error prone. Instead it can be specified in `Directory.Build.props` and applied to all projects:

::: tip Directory.Build.props

```xml
<PropertyGroup>
  <Company>Your Company</Company>
  <Authors>$(Company)</Authors>
  <Copyright>Copyright © $(Company) $([System.DateTime]::Now.Year)</Copyright>
  <Trademark>$(Company)™</Trademark>
  <Product>$(Company) - Your Project</Product>
  <VersionPrefix>1.0.0</VersionPrefix>
</PropertyGroup>
```

:::

### <ConsiderIcon /> Use EditorConfig for Consistent C\#

- Use `.editorconfig` and Roslyn Analyzers

## Project Structure

### <EssentialIcon /> Create Solution Items Folder

- Add a new [folder in your .NET solution](https://docs.microsoft.com/en-us/visualstudio/ide/solutions-and-projects-in-visual-studio?view=vs-2022#solution-folder) to contain items at the root of your project that should be visible in Visual Studio
- It's common to name this folder `Solution Items`

**Why?**

.NET solutions have traditionally focused on source code and projects since they are a target for compilation. However,
it's also common to have many files in a .NET repository that are not code or projects, like [README.md](#add-a-repository-readme-md) and `.gitignore` files. These should be viewable and editable in the same way that source code is editable. Having these files visible (in Visual Studio or Rider) makes them more likely to be edited and kept up to date.

**Why?**

Having a solution folder with a convention-based name makes it easier for developers to explore a project and find common non-code files.

### <ConsiderIcon /> Create Build Folder

### <ConsiderIcon /> Create Source Folder

### <ConsiderIcon /> Co-Locate Tests and Libraries

- In a .NET solution, keep test projects adjacent to the applications and libraries they are associated with
- Create a solution folder for each project and place both the application (or library) and its test project in the solution folder

**Why?**

By co-locating tests and the source the tests were written for, the tests and code are more likely to stay in-sync.

**Why?**

Developers will be more likely to keep testing in mind when adding new features if they are reminded there is a place to add
tests in the solution and they don't have to go hunt down the correct test project.

**Why?**

Solution folders are a virtual organizational tool for .NET projects. This means source code and test code can still
be located in different paths on the file system (ex: `src/` and `test/`) even if they are co-located in the solution.

### <ConsiderIcon /> Use Source Link for NuGet Packaged Libraries

### <EssentialIcon /> Feature Folders (Vertical Slice Architecture)

- Create folders in a .NET project based on a feature
- Organize and architect classes to be feature-oriented

**Why?**

Developers work on features so organizing code by feature helps developers find many of
the pieces of code they need to modify when working on a feature. If they need to create new code for a feature,
it's obvious, based on the feature-oriented organization, where that code should go in a project.

**Why?**

Projects organized by features are more comprehensible because the feature folders end up being
a list of the application's main entrypoints an functionality. The feature folders also aid in revealing
the complexity level of a given feature compared to another.

**Why?**

Feature folders encourage developers to think about functionality as a [Vertical Slice](https://codeopinion.com/restructuring-to-a-vertical-slice-architecture/), which is an architecture that leads to features
that are easier to work on without incurring regressions elsewhere in an application. Vertical slices are also
easier to separate into their own applications if they end up having unique scalability or deployment requirements.

::: danger Avoid organizing by type

Developers are never tasked to work on "interfaces" or "view models". Instead they are tasked with
resolving issues or creating new functionality for features. Organizing code by what 'type' of a thing
it is (ex: "interface", "implementation", "factory", "view model") focuses too much on a somewhat arbitrary
technical detail, while the real focus in a codebase should be on business use-case.

:::

### <ConsiderIcon /> Multiple Coupled Types per-file

- Keep coupled classes/types in the same file

### <EssentialIcon /> Co-Locate Controllers, View Models, and Views

- Place Controllers, View Models, and Views all in the same [feature folder](#feature-folders-vertical-slice-architecture)
- Move the `_ViewImports.cshtml` and `_ViewStart.cshtml` files to the root of the ASP.NET Core project so they are
  accessible to Views outside the `~/Views` folder
- Optional: Define Controllers (or View Component classes) and their View Model classes in the same file
- Optional: [Customize a ViewLocationExpander](<http://devtrev.com/Trev-Tips-(Blog)/January-20201/Enabling-Feature-Folders-Custom-View-Paths-in-Xp>) to help MVC understand the conventions for your project structure

**Why?**

The majority of code in an ASP.NET Core MVC application is related to presentation of information.
Models, Views, and Controllers are all presentation concerns and are all edited together - a change in a View Model typically results
in a change in both a Controller and View. By co-locating these files we aren't breaking some rule of 'separation of concerns'
since all of these files are for the same (presentation) concern. Instead we are making our lives easier when working
in the project since we won't need to jump around the project folder hierarchy every time we make a change to presentation functionality.

**Why?**

Most developers working on a Kentico Xperience application won't only work in C# files or Razor Views - we tend to
have responsibilities for all areas of content presentation. Separating Views into their own folder creates
an artifical barrier that doesn't align with developer workloads.

**Why?**

View Models only exist to pass data from Controllers (and View Component classes) to Views. They are never used
outside of this role and they are typically unique to a Controller/View pair. This means these files are all tightly coupled.
While too many lines of code in a single file _can_ be a code smell, this is typically only when a single unit of encapsulation (class, method)
has too many lines.

There's nothing wrong with defining multiple classes in the same file, especially when they are tightly coupled, and co-locating
them will help increase developer productivity when working on these types.
