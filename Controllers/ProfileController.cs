using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using project.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Newtonsoft.Json;
using project.Models.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;

namespace project.Controllers
{
    public class ProfileController : Controller
    {
        private readonly IWebHostEnvironment _env;
        public class backgroundskin
        {
            public string bodyskin { get; set; }
        }
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
        public ProfileController(IWebHostEnvironment env)
        {
            _env = env;
        }
        [Authorize]
        [HttpGet]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        [HttpGet]
        public IActionResult changeicon()
        {
            return RedirectToAction("Index", "Error");
        }
        [Authorize]
        [HttpPost]
        public IActionResult changepassword()
        {
            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> changeiconAsync(IFormCollection data)
        {
            var files = data.Files;
            //var files = HttpContext.Request.Form.Files;
            string path = await Upload.fileAsync(files);

            //add factory here
            string imgpath = String.Format("{0}/img/user/{1}",URLrootPath(),Path.GetFileName(path));
            var name = HttpContext.Request.Cookies["name"];
            var email = HttpContext.Request.Cookies["email"];
            var certification = HttpContext.Request.Cookies["certification"];
            var usertype = HttpContext.Request.Cookies["usertype"];
            var blocked = HttpContext.Request.Cookies["blocked"];
            //var imagePath = HttpContext.Request.Cookies["imagePath"];
            var bodyskin = HttpContext.Request.Cookies["bodyskin"];
            if (usertype.Equals("normal"))
            {
                List<user> userlist = Loading.userdata();
                foreach (var child in userlist)
                {
                    if (email.Equals(child.email))
                    {
                        child.imagePath = imgpath;
                        break;
                    }
                }
                Loading.writeuserdata(userlist);
            }
            else
            {
                List<root> rootlist = Loading.rootdata();
                rootlist[0].imagePath = imgpath;
                Loading.writerootdata(rootlist);
            }
            

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Response.Cookies.Delete("name");
            HttpContext.Response.Cookies.Delete("email");
            HttpContext.Response.Cookies.Delete("certification");
            HttpContext.Response.Cookies.Delete("usertype");
            HttpContext.Response.Cookies.Delete("blocked");
            HttpContext.Response.Cookies.Delete("imagePath");
            HttpContext.Response.Cookies.Delete("bodyskin");

            List<Claim> SendToCookies = new List<Claim>()
            {
                new Claim(ClaimTypes.Name,name),
                new Claim("certification",certification),
                new Claim("emailaddress",email),
                new Claim("usertype",usertype),
                new Claim("blocked",blocked),
                new Claim("imagePath",imgpath)
            };
            var useridentity = new ClaimsIdentity(SendToCookies, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(useridentity)
            );

            HttpContext.Response.Cookies.Append("name", name);
            HttpContext.Response.Cookies.Append("email", email);
            HttpContext.Response.Cookies.Append("certification", certification);
            HttpContext.Response.Cookies.Append("usertype", usertype);
            HttpContext.Response.Cookies.Append("blocked", blocked);
            HttpContext.Response.Cookies.Append("imagePath", imgpath);
            HttpContext.Response.Cookies.Append("bodyskin", bodyskin);
            //Refactor the code as per your need
            return RedirectToAction("Index","Home");
        }
        [HttpPost]
        [Authorize]
        public JsonResult changebackgroundskin([FromBody] backgroundskin data)
        {
            if (HttpContext.Request.Cookies["usertype"].Equals("normal"))
            {
                List<user> datas = Loading.userdata();
                string email = HttpContext.Request.Cookies["email"];
                foreach (var child in datas)
                {
                    if (child.email.Equals(email))
                    {
                        child.bodyskin = data.bodyskin;
                        break;
                    }
                }
                Loading.writeuserdata(datas);
                HttpContext.Response.Cookies.Delete("bodyskin");
                HttpContext.Response.Cookies.Append("bodyskin", data.bodyskin);
            }
            else
            {
                List<root> datas = Loading.rootdata();
                datas[0].bodyskin = data.bodyskin;
                Loading.writerootdata(datas);
                HttpContext.Response.Cookies.Delete("bodyskin");
                HttpContext.Response.Cookies.Append("bodyskin", data.bodyskin);
            }
            return Json(null);
        }
    }
}
