# Caching

## Optimizations

- Avoid caching Xperience types `TreeNode`, `BaseInfo`
  - Cache custom DTOs/domain models instead

## Maintainability

- Implement as cross-cutting concerns via filters or decoration
  - Avoid putting caching in business logic
- Don't construct cache dependency keys via attributes
- Set short cache lifetimes for most queries
- Separate queries from commands (mutations)
- Avoid repositories
  - Try CQRS / Rich domain models / Service layers
