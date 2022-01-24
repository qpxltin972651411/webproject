using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using project.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace project.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ClaimsPrincipal _cookies;
        private readonly IWebHostEnvironment _env;
        public string URLrootPath()
        {
            //https://localhost:44369/
            return HttpContext.Request.Scheme + "://" + HttpContext.Request.Host.ToString() + HttpContext.Request.PathBase.ToString();
        }
        public string WebProjectPath()
        {
            return _env.ContentRootPath;                    //D:\factory\project
        }
        public string WebStaticPath()
        {
            return _env.WebRootPath;                        //D:\factory\project\wwwroot
        }
        public HomeController(ILogger<HomeController> logger, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env)
        {
            _logger = logger;
            _cookies = httpContextAccessor.HttpContext.User;
            _env = env;
        }
        
        [Authorize]
        [HttpGet]
        public IActionResult Index()
        {
            int ln = _cookies.Claims.ToList().Count;
            if (!(ln > 0))
            {
                return RedirectToAction("Index", "Signin");
            }
            else
            {
                if (_cookies.Claims.FirstOrDefault(x => x.Type == "certification").Value == "False")
                {
                    return RedirectToAction("Successful", "Signup");
                }
                if (_cookies.Claims.FirstOrDefault(x => x.Type == "blocked").Value == "True")
                {
                    return RedirectToAction("Index", "Denied");
                }
            }
            return View();
        }
        [Authorize]
        [HttpGet]
        public IActionResult Privacy()
        {
            var a = HttpContext.Request.Host.ToString();
            var ss = HttpContext.Request.Path.ToString();
            var sss = HttpContext.Request.PathBase.ToString();
            string filePaths = Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "userdata","123.json");
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(filePaths))
                {
                    file.WriteLine(a);
                    file.WriteLine(ss);
                    file.WriteLine(sss);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", filePaths[0], e.Message);
            }
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
