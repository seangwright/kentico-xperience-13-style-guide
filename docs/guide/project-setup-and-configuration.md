# Project Setup and Configuration

## MS Build

- Enable `<nullable>enable</nullable>`
- Enable `<WarningsAsErrors>nullable</WarningsAsErrors>`
- Use `.editorconfig` and Roslyn Analyzers
- Use `Directory.Build.props`

## Structure

- Keep tests next to projects in Solution
- Follow Feature Folder (or Vertical Slice) code organization
  - Avoid organizing by type (Model, Interface, Provider/Service)
- Keep coupled classes/types in the same file
- Organize Views and Models next to their Controller/View Component classes

## Docs

- Add a `README.md`
- Add an Architectural Decision Record
