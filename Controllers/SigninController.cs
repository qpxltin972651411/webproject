using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using project.Models;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using project.Models.DataModels;
using Microsoft.AspNetCore.Hosting;
using System.Threading;

namespace project.Controllers
{
    public class SigninController : Controller
    {
        private List<user> userlist;
        private List<root> rootlist;
        private ClaimsPrincipal _cookies;
        private readonly IWebHostEnvironment _env;
        private ReaderWriterLockSlim cacheLock = new ReaderWriterLockSlim();
        //private IConfiguration _config;
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
        public SigninController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env)
        {
            _cookies = httpContextAccessor.HttpContext.User;
            _env = env;
        }
        [HttpGet]
        public IActionResult Index()
        {
            int ln = _cookies.Claims.ToList().Count;
            if (ln > 0)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        [HttpGet]
        public IActionResult Login()
        {
            return RedirectToAction("Index", "Error");
        }
        
        [HttpPost]
        public async Task<IActionResult> LoginAsync(IFormCollection formdata)
        {
            string usertype = formdata["usertype"];
            string account = formdata["account"];
            string password = formdata["pass"];
            if (usertype.Equals("normal"))
            {
                //normal user log in
                userlist = Loading.userdata();
                if (userlist != null)
                {
                    foreach (var child in userlist)
                    {
                        string enaccstring = endecryption.encode(child.aentime, child.account);
                        if (account.Equals(enaccstring))
                        {
                            string enpassstring = endecryption.encode(child.pentime, child.password);
                            if (password.Equals(enpassstring))
                            {
                                List<Claim> SendToCookies = new List<Claim>()
                                {
                                    new Claim(ClaimTypes.Name,child.nickname),
                                    new Claim("certification",child.certification.ToString()),
                                    new Claim("emailaddress",child.email),
                                    new Claim("usertype","normal"),
                                    new Claim("blocked",child.blocked.ToString()),
                                    new Claim("imagePath",child.imagePath)
                                };
                                var useridentity = new ClaimsIdentity(SendToCookies, CookieAuthenticationDefaults.AuthenticationScheme);
                                await HttpContext.SignInAsync(
                                    CookieAuthenticationDefaults.AuthenticationScheme,
                                    new ClaimsPrincipal(useridentity)
                                );
                                HttpContext.Response.Cookies.Append("name", child.nickname);
                                HttpContext.Response.Cookies.Append("email", child.email);
                                HttpContext.Response.Cookies.Append("certification", child.certification.ToString());
                                HttpContext.Response.Cookies.Append("usertype", "normal");
                                HttpContext.Response.Cookies.Append("blocked", child.blocked.ToString());
                                HttpContext.Response.Cookies.Append("imagePath", child.imagePath);
                                HttpContext.Response.Cookies.Append("bodyskin", child.bodyskin);
                                return RedirectToAction("Index", "Home");
                            }
                            else
                            {
                                TempData["message"] = "* 登入失敗";
                                return RedirectToAction("Index", "Signin");
                            }
                        }
                    }
                    TempData["message"] = "* 登入失敗";
                    return RedirectToAction("Index", "Signin");
                }
                else
                {
                    TempData["message"] = "* 登入失敗";
                    return RedirectToAction("Index", "Signin");
                }
            }
            else
            {
                //admin log in
                rootlist = Loading.rootdata();
                if (rootlist != null)
                {
                    var child = rootlist[0];
                    string enaccstring = endecryption.encode(child.aentime, child.account);
                    if (account.Equals(enaccstring))
                    {
                        string enpassstring = endecryption.encode(child.pentime, child.password);
                        if (password.Equals(enpassstring))
                        {
                            List<Claim> SendToCookies = new List<Claim>()
                            {
                                new Claim(ClaimTypes.Name,child.nickname),
                                new Claim("certification",true.ToString()),
                                new Claim("emailaddress",child.email),
                                new Claim("usertype","admin"),
                                new Claim("blocked",false.ToString()),
                                new Claim("imagePath",child.imagePath),
                            };
                            var useridentity = new ClaimsIdentity(SendToCookies, CookieAuthenticationDefaults.AuthenticationScheme);
                            await HttpContext.SignInAsync(
                                CookieAuthenticationDefaults.AuthenticationScheme,
                                new ClaimsPrincipal(useridentity)
                            );
                            HttpContext.Response.Cookies.Append("name", child.nickname);
                            HttpContext.Response.Cookies.Append("email", child.email);
                            HttpContext.Response.Cookies.Append("certification", true.ToString());
                            HttpContext.Response.Cookies.Append("usertype", "admin");
                            HttpContext.Response.Cookies.Append("blocked", false.ToString());
                            HttpContext.Response.Cookies.Append("imagePath", child.imagePath);
                            HttpContext.Response.Cookies.Append("bodyskin", child.bodyskin);
                            return RedirectToAction("Index", "Home");
                        }
                        else
                        {
                            TempData["message"] = "* 登入失敗";
                            return RedirectToAction("Index", "Signin");
                        }
                    }
                    TempData["message"] = "* 登入失敗";
                    return RedirectToAction("Index", "Signin");
                }
                else
                {
                    TempData["message"] = "* 未知錯誤 無管理員 請新增管理員";
                    return RedirectToAction("Index", "Signin");
                }
            }
        }
    }
}
