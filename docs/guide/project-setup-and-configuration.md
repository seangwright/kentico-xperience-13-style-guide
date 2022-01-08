# Project Setup and Configuration

## Documentation

### <EssentialIcon /> Add a Repository README.md

- Add a `README.md`

### <ConsiderIcon /> Maintain an Architectural Decision Record (ADR)

- Add an Architectural Decision Record

### <ConsiderIcon /> Add XML Doc Comments

### <ConsiderIcon /> Commit SQL Scripts

## .NET and C\#

### <EssentialIcon /> Use the Latest Target Frameworks for Applications

### <EssentialIcon /> Use .NET Standard 2.0 for Shared Libraries

### <EssentialIcon /> Use SDK-Style Projects

### <EssentialIcon /> Directory.Build.props for Shared Configuration

- Use `Directory.Build.props`

### <EssentialIcon /> Enable Nullable Reference Types

- Enable `<nullable>enable</nullable>`
- Enable `<WarningsAsErrors>nullable</WarningsAsErrors>`

### <ConsiderIcon /> Use EditorConfig for Consistent C\#

- Use `.editorconfig` and Roslyn Analyzers

## Project Structure

### <EssentialIcon /> Create Solution Items Folder

### <ConsiderIcon /> Create Build Folder

### <ConsiderIcon /> Create Source Folder

### <ConsiderIcon /> Co-Locate Tests and Libraries

- Keep tests next to projects in Solution

### <EssentialIcon /> Feature Folders (Vertical Slice Architecture)

- Follow Feature Folder (or Vertical Slice) code organization
  - Avoid organizing by type (Model, Interface, Provider/Service)

### <ConsiderIcon /> Multiple Coupled Types per-file

- Keep coupled classes/types in the same file

### <EssentialIcon /> Co-Locate Controllers, View Models, and Views

- Organize Views and Models next to their Controller/View Component classes
