using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project.Models;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace project
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
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option => {
                option.Cookie.Name = "User.cookie";
                //瀏覽器會限制cookie 只能經由HTTP(S) 協定來存取
                option.Cookie.HttpOnly = true;
                //登入頁，未登入時會自動導到登入頁
                option.LoginPath = "/Signin/Index";
                //option.LogoutPath = "/Home/Index";
                //登入有效時間
                option.ExpireTimeSpan = TimeSpan.FromDays(1);
                //option.AccessDeniedPath = "/Home/Denied";
            });
            services.AddHttpContextAccessor();
            services.AddControllersWithViews();

            //services.Configure<DataConfig>(Configuration);
            //services.Configure<MyConfig>(Configuration.GetSection("MyConfig"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404)
                {
                    //Re-execute the request so the user gets the error page
                    string originalPath = context.Request.Path.Value;
                    System.Console.WriteLine(originalPath);
                    context.Items["originalPath"] = originalPath;
                    context.Request.Path = "/Error/Index";
                    await next();
                }
            });
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            //app.UseAuthorization();
            app.UseAuthentication(); // cookie      驗證  
            app.UseAuthorization(); //授權        [authorize]

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Signin}/{action=Index}/{id?}");
            });
        }
    }
}
