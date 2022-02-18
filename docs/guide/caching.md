# Caching

## Optimizations

### <EssentialIcon /> Only Cache What is Needed By Your Application

- Create custom [Data Transfer Object](https://docs.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) (DTO) C# classes or [record types](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/records)
- Map `TreeNode` and `BaseInfo` objects retrieved from the database into your custom types
- Insert these custom types into the cache

**Why?**

`TreeNode` and `BaseInfo` objects are strongly typed wrappers around a [DataSet](https://docs.microsoft.com/en-us/dotnet/api/system.data.dataset?view=net-6.0) but the values of that underlying `DataSet` are populated based on the query that was used to retrieve data
from the database.

They do not change their API based on what they contain, which means they are good at modeling what _might_ be in the database but poor at modeling what _is_ in memory in your application at any given time.

**Why?**

If you are using `TreeNode` and `BaseInfo` objects in a part of your code that is far from where the database query occurred it can be very difficult to trust that the objects contain the fields you expect.

They could contain _less_ data than was expected and when your application uses the cached data it will not function correctly.

Custom DTOs let you define which fields are required for your application to function correctly, ensuring the cached data is correct and consistent.

**Why?**

`TreeNode` and `BaseInfo` objects could also contain _more_ data than was required, in which case caching is going to store more data in memory than your application needs.

Ideally, this is resolved by optimizing your database querying to retrieve less data, but then you might run into the issue mentioned above when _less_ data was available than expected.

## Maintainability

- Implement as cross-cutting concerns via filters or decoration
  - Avoid putting caching in business logic
- Don't construct cache dependency keys via attributes
- Set short cache lifetimes for most queries
- Separate queries from commands (mutations)
- Avoid repositories
  - Try CQRS / Rich domain models / Service layers
