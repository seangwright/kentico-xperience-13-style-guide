# Data Querying

## Implementation

- Use the following for querying in this order
  - `IPageRetriever` for querying
    - More testable
    - Applies request context automatically
  - `ObjectQuery`/`DocumentQuery`
    - Handles protecting against SQL injection
    - Generates syntactically correct SQL
    - Makes queries dynamically composable
  - SQL text in C#
    - Under source control
    - Integration testable
  - SQL queries in CMS
    - Modifiable if needed
    - Ideal for CMS UI (Custom Module Classes / UniGrid definitions)
  - Store procedures
    - Database is not good source control
- Create query extensions for common patterns
- Always use async querying

## Optimizations

- Avoid N+1 querying
- Use `.Columns()` to improve query performance
- Retrieve the full `TreeNode` if you need to call a method requiring a `TreeNode` (ex: `IPageUrlRetriever`)

## Refactoring

- Use `nameof()` to aid in refactor
- Avoid authoring SQL in the admin application
- Write integration tests for complex queries

## Results

- Include identifiers to set cache keys
- Get Image/Width height for Media Library/Attachments
- Map Xperience types (`TreeNode`, `BaseInfo` objects) into DTOs
  - Optimizes caching
  - Only retrieved data is accessible (`TreeNode` is a dynamic container)

### <ConsiderIcon /> Use Result Container for Querying

### <ConsiderIcon /> Model Missing Data with Maybe/Option Container
