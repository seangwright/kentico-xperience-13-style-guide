# ASP.NET Core

## Settings

### <ConsiderIcon /> Store Environment-Specific Configuration in appsettings.json

- Use `appsettings.json` to store configuration that is environment specific
- Structure configuration hierarchically using JSON
- Provide intelligent defaults when reading in configuration in the ASP.NET Core application

**Why?**

Test and Production aren't the only environments that developers need to consider. "Local"
is likely the environment where developers need the most control over configuration and
[user secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows) allows for easy customization that is scoped to each developer's individual workspace.

**Why?**

Values deployed to the application file system in production are more secure than [custom CMS Settings](https://docs.xperience.io/custom-development/creating-custom-modules/adding-custom-website-settings)
which can be read and updated by an administrator. If configuration needs to be more secure and does not
need to be edited while the application is running, `appsettings.json` is a better source of values
than CMS Settings.

**Why?**

All [CI/CD](https://youtu.be/scEDHsr3APg) systems have a way to populate configuration files with
environment-specific or security-sensitive values _after_ an application build has completed but _before_ the
build artifact is deployed to an environment. These values (ex: database connection strings, API keys) are
stored with their own security settings to ensure they cannot be read or updated without specific permissions.

### <ConsiderIcon /> Store Runtime or Site-Specific Configuration in CMS Settings

- Create [custom CMS Settings](https://docs.xperience.io/custom-development/creating-custom-modules/adding-custom-website-settings)
- Manage these settings per-environment
- Ensure changes to the settings are not accidentally synced to another environment [using Content Staging](https://docs.xperience.io/deploying-websites/content-staging)

**Why?**

Kentico Xperience has existing APIs and administration UI for managing configuration that is both global
and site specific. To re-build this functionality in the ASP.NET Core `appsettings.json` configuration is
often unnecessary.

**Why?**

Some configuration needs to be editable at runtime. Typically, configuration found in `appsettings.json` files
is not accessible to site administrators and could require an application restart for the application to read
updated values.

CMS Settings are accessible by the application as soon as they are updated, making them useful for values
that need to be changed as need arises without require a deployment or access to the hosting environment.

## App Setup

### <EssentialIcon /> Fluent Builder APIs for DI and Middleware Registration

- Create extension methods to abstract application setup out of `Startup.cs` or `Program.cs`
- Use a [fluent builder API pattern](https://medium.com/@martinstm/fluent-builder-pattern-c-4ac39fafcb0b) to keep setup readable
- Add helper extension methods to make non-fluent setup APIs chainable

**Why?**

Application setup code is often very declarative without much conditional logic and it describes what the application
uses and what it does, rather than how it does it. To make setup code more readable, a fluent builder API can remove
unnecessary syntax and read more like a table of contents than C# code.

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services) =>
        services
            .AddAppXperience()
            .AddAppMembership()
            .AddAppMVC()
            .AddAppCore(Environment, Config);
}
```

It's very clear, from a high level, what the major areas of functionality are of this application,
and these extension methods can be made more or less high level depending on the application's complexity.

**Why?**

The same pattern can be followed for defining the ASP.NET Core middleware pipeline, which is already
a very declarative section of the application:

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app) =>
        app
            .IfDevelopment(Environment, a => a
                .UseDeveloperExceptionPage())
            .IfNotDevelopment(Environment, a => a
                .UseExceptionHandler(new ExceptionHandlerOptions
                {
                    AllowStatusCode404Response = true,
                    ExceptionHandlingPath = "/error"
                })
            )
            .UseHttpsRedirection()
            .UseStaticFiles()
            .UseStatusCodePagesWithReExecute("/not-found", "?code={0}")
            .IfDevelopment(Environment, a => a
                .UseSwagger()
                .UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1")))
            .UseKentico()
            .UseAuthentication()
            .UseEndpoints(endpoints =>
            {
                endpoints.Kentico().MapRoutes();

                _ = endpoints.MapControllers();
            });
}
```

**Why?**

Each extension method can then call additional extension methods. Since application setup is not stateful and
lacks logic, there's no harm in using `static` extension methods and avoiding intermediate variables.

**Why?**

An organized, high-level `Startup.cs` will be easier to adapt to the new [ASP.NET Core minimal startup](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/startup?view=aspnetcore-6.0)

::: tip Maintaining Startup.cs

To learn more about how to organize and maintain a `Startup.cs` file, read [Kentico Xperience Design Patterns: Good Startup.cs Hygiene](https://dev.to/seangwright/kentico-xperience-design-patterns-good-startup-cs-hygiene-3klm)

:::

### <ConsiderIcon /> Group Extensions Based on Sub-System

- Extensions tell a story about what features your app has

### <EssentialIcon /> Use Reflection vs Manual DI Registration

- Use reflection for registering types with many implementations
