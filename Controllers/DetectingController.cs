using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Newtonsoft.Json;
using project.Models;
using project.Models.DataModels;
namespace project.Controllers
{
    public class DetectingController : Controller
    {
        private List<onlinelist> server_online_list = null;
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
        public class userBlockingModel
        {
            public string name { get; set; }
            public string url { get; set; }
            public string datetime { get; set; }
            public string email { get; set; }
            public string imagePath { get; set; }
        }
        public class localdataDeleteModel
        {
            public string tax { get; set; }
            public string name { get; set; }
        }
        public class returnonlinejson
        {
            public string name { get; set; }
            public bool status { get; set; }
            public string email { get; set; }
            public string imagePath { get; set; }
        }
        
        public DetectingController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env)
        {
            _cookies = httpContextAccessor.HttpContext.User;
            _env = env;
        }
        public List<returnonlinejson> GetUserStatus()
        {
            List<returnonlinejson> res = new List<returnonlinejson>();
            foreach (var each in server_online_list)
            {
                string d = each.datetime.Split("@")[0].Replace(" ", "");
                string dee = each.datetime.Split("@")[1].Replace(" ", "");
                var a = DateTime.Now;
                DateTime b = Convert.ToDateTime(d + " " + dee);
                var diffInSeconds = (a - b).TotalSeconds;
                if (diffInSeconds > 10)
                {
                    res.Add(new returnonlinejson()
                    {
                        name = each.name,
                        status = false,
                        email = each.email,
                        imagePath = each.imagePath
                    });
                }
                else
                {
                    res.Add(new returnonlinejson()
                    {
                        name = each.name,
                        status = true,
                        email = each.email,
                        imagePath = each.imagePath
                    });
                }
            }
            return res;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Error");
        }
        [HttpPost]
        [Authorize]
        public IActionResult deleteLocaldata([FromBody] localdataDeleteModel data)
        {
            List<localunit> datas = Loading.localunit();
            datas.RemoveAll(p => (p.name == data.name && p.tax == data.tax));
            Loading.writelocalunit(datas);
            return RedirectToAction("Index", "DataView");
        }
        
        [HttpPost]
        [Authorize]
        public JsonResult Index([FromBody] userBlockingModel data)
        {
            //update user online list
            List <returnonlinejson> ret = new List<returnonlinejson>();
            server_online_list = Loading.onlinelist();
            if (server_online_list == null)
            {
                server_online_list = new List<onlinelist>();
                onlinelist onuser = new onlinelist();
                onuser.name = data.name;
                onuser.datetime = data.datetime;
                onuser.url = data.url;
                onuser.email = data.email;
                onuser.imagePath = data.imagePath;
                server_online_list.Add(onuser);
                Loading.createonlinelist(server_online_list);
            }
            else
            {
                foreach (var ol in server_online_list)
                {
                    if (data.email.Equals(ol.email))
                    {
                        ol.datetime = data.datetime;
                        ol.url = data.url;
                        ol.name = data.name;
                        ol.imagePath = data.imagePath;
                        Loading.writeonlinelist(server_online_list);
                        GC.Collect();
                        return Json(GetUserStatus());
                    }
                }
                //new user online
                onlinelist onuser = new onlinelist();
                onuser.name = data.name;
                onuser.datetime = data.datetime;
                onuser.url = data.url;
                onuser.email = data.email;
                onuser.imagePath = data.imagePath;
                server_online_list.Add(onuser);
                Loading.writeonlinelist(server_online_list);
            }
            return Json(GetUserStatus());
        }
        [HttpGet]
        [Authorize]
        public async Task<JsonResult> listeningcertificationAsync()
        {
            var email = _cookies.Claims.Where(c => c.Type == "emailaddress")
                   .Select(c => c.Value).SingleOrDefault();
            var user_status = Loading.userdata();
            if (user_status != null)
            {
                foreach (var each in user_status)
                {
                    if (each.email.Equals(email))
                    {
                        var cer = _cookies.Claims.Where(c => c.Type == "certification").Select(c => c.Value).SingleOrDefault();
                        bool status = false;
                        if (cer == "False" || cer == "false")
                            status = false;
                        else
                            status = true;
                        if (status != each.certification)
                        {
                            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                            List<Claim> SendToCookies = new List<Claim>()
                            {
                                new Claim(ClaimTypes.Name,each.nickname),
                                new Claim("certification",each.certification.ToString()),
                                new Claim("emailaddress",each.email),
                                new Claim("usertype","normal"),
                                new Claim("blocked",each.blocked.ToString()),
                                new Claim("imagePath",each.imagePath)
                            };
                            var useridentity = new ClaimsIdentity(SendToCookies, CookieAuthenticationDefaults.AuthenticationScheme);
                            await HttpContext.SignInAsync(
                                CookieAuthenticationDefaults.AuthenticationScheme,
                                new ClaimsPrincipal(useridentity)
                            );
                            HttpContext.Response.Cookies.Append("name", each.nickname);
                            HttpContext.Response.Cookies.Append("email", each.email);
                            HttpContext.Response.Cookies.Append("certification", each.certification.ToString());
                            HttpContext.Response.Cookies.Append("usertype", "normal");
                            HttpContext.Response.Cookies.Append("blocked", each.blocked.ToString());
                            HttpContext.Response.Cookies.Append("imagePath", each.imagePath);
                            HttpContext.Response.Cookies.Append("bodyskin", each.bodyskin);
                            return Json(each.certification.ToString());
                        }
                    }
                }
            }
            return Json(null);
        }
        [HttpGet]
        [Authorize]
        public async Task<JsonResult> listeningblockingAsync()
        {
            var email = _cookies.Claims.Where(c => c.Type == "emailaddress")
                   .Select(c => c.Value).SingleOrDefault();
            var user_status = Loading.userdata();
            if (user_status != null)
            {
                foreach (var each in user_status)
                {
                    if (each.email.Equals(email))
                    {
                        var blocked = _cookies.Claims.Where(c => c.Type == "blocked").Select(c => c.Value).SingleOrDefault();
                        bool status = false;
                        if (blocked == "False" || blocked == "false")
                            status = false;
                        else
                            status = true;
                        if (status != each.blocked)
                        {
                            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                            List<Claim> SendToCookies = new List<Claim>()
                            {
                                new Claim(ClaimTypes.Name,each.nickname),
                                new Claim("certification",each.certification.ToString()),
                                new Claim("emailaddress",each.email),
                                new Claim("usertype","normal"),
                                new Claim("blocked",each.blocked.ToString()),
                                new Claim("imagePath",each.imagePath)
                            };
                            var useridentity = new ClaimsIdentity(SendToCookies, CookieAuthenticationDefaults.AuthenticationScheme);
                            await HttpContext.SignInAsync(
                                CookieAuthenticationDefaults.AuthenticationScheme,
                                new ClaimsPrincipal(useridentity)
                            );
                            HttpContext.Response.Cookies.Append("name", each.nickname);
                            HttpContext.Response.Cookies.Append("email", each.email);
                            HttpContext.Response.Cookies.Append("certification", each.certification.ToString());
                            HttpContext.Response.Cookies.Append("usertype", "normal");
                            HttpContext.Response.Cookies.Append("blocked", each.blocked.ToString());
                            HttpContext.Response.Cookies.Append("imagePath", each.imagePath);
                            HttpContext.Response.Cookies.Append("bodyskin", each.bodyskin);
                            return Json(each.blocked.ToString());
                        }
                    }
                }
            }
            return Json(null);
        }
    }
}
