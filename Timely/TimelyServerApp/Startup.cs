using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TimelyServerApp.Entities;
using TimelyServerApp.Repositories;

namespace TimelyServerApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string AllowSpecificOrigins = "_allowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TimelyDBContext>(opts => opts.UseSqlServer(Configuration["ConnectionString:DefaultConnection"]));

            services.AddScoped<IRepository<Project>, ProjectRepository>();
            services.AddScoped<IWorkSessionRepository, WorkSessionRepository>();
            services.AddScoped<IRepository<Tag>, TagRepository>();

            services.AddCors(options =>
            {
                options.AddPolicy(AllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                });
            });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(AllowSpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
