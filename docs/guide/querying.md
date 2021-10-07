# Data Querying

## Implementation

- Use `IPageRetriever` for querying
  - More testable
  - Applies request context automatically
- Create `DocumentQuery<T>` extensions for common patterns
- Always use async querying

## Optimizations

- Avoid N+1 querying
- Use `.Columns()` to improve query peformance

## Refactoring

- Use `nameof()` to aid in refactor
- Avoid authoring SQL in the admin application
- Write integration tests for complex queries

## Results

- Include identifiers to set cache keys
- Get Image/Width height for Media Library/Attachments
