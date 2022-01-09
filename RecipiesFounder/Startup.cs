using ApplicationLoggerLibrary;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using RecipesFounder.AplicationLogic.Service.Implementation;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.AplicationLogic.Service.UnitOfWork;
using RecipesFounder.DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipiesFounder
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<RecipeFounderDbContext>(options => options.UseSqlite(Configuration.GetConnectionString("cs")));
            //Session
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            services.AddSingleton<ILoggerService, LoggerService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUnitOfWorkForServices, UnitOfWorkForServices>();
            services.AddScoped<IJsonWebTokenService, JsonWebTokenServiceImpl>();
            //For Jwt
            var tokenValidationParameter = new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["SecretKey"])),
                RequireExpirationTime = true,
                ClockSkew = TimeSpan.Zero
            };
            services.AddSingleton(tokenValidationParameter);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = tokenValidationParameter;
            });


            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1",
                    new Microsoft.OpenApi.Models.OpenApiInfo
                    {
                        Title = "Swagger Demo API",
                        Description = "Demo API for showing Swagger",
                        Version = "v1"
                    });
            });

            services.AddCors();
            services.AddMvc().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options => options
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //Session
            app.UseSession();
            app.UseHttpsRedirection();


            app.UseRouting();

            app.UseAuthorization();
            
            app.UseSwagger();
            app.UseSwaggerUI(options =>
             {
                 options.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Demo API");
             });
            //Add JWToken to all incoming HTTP Request Header
            app.Use(async (context, next) =>
            {
                var jwToken = context.Session.GetString("Token");
                if (!string.IsNullOrEmpty(jwToken))
                {
                    context.Request.Headers.Add("Authorization", "Bearer " + jwToken);
                }
                await next();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
