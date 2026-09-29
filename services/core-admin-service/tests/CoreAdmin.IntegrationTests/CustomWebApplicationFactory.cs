using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using CoreAdmin.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CoreAdmin.IntegrationTests;

public class StreamJsonOutputFormatter : TextOutputFormatter
{
    public StreamJsonOutputFormatter()
    {
        SupportedMediaTypes.Add("application/json");
        SupportedMediaTypes.Add("text/json");
        SupportedEncodings.Add(Encoding.UTF8);
    }

    public override async Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
    {
        var response = context.HttpContext.Response;
        var options = new JsonSerializerOptions(JsonSerializerDefaults.Web);
        if (context.Object != null)
        {
            await JsonSerializer.SerializeAsync(response.Body, context.Object, context.ObjectType ?? context.Object.GetType(), options);
        }
    }
}

public class CustomWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<CoreAdminDbContext>));
            if (descriptor != null)
            {
                services.Remove(descriptor);
            }

            services.AddDbContext<CoreAdminDbContext>(options =>
            {
                options.UseInMemoryDatabase("InMemoryDbForTesting");
            });

            services.Configure<Microsoft.AspNetCore.Mvc.MvcOptions>(options =>
            {
                options.OutputFormatters.RemoveType<SystemTextJsonOutputFormatter>();
                options.OutputFormatters.Insert(0, new StreamJsonOutputFormatter());
            });

            var sp = services.BuildServiceProvider();
            using (var scope = sp.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var db = scopedServices.GetRequiredService<CoreAdminDbContext>();
                db.Database.EnsureCreated();
            }
        });
    }
}
