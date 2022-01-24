using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Controllers
{
    public class SignoutController : Controller
    {
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> IndexAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Response.Cookies.Delete("name");
            HttpContext.Response.Cookies.Delete("email");
            HttpContext.Response.Cookies.Delete("certification");
            HttpContext.Response.Cookies.Delete("usertype");
            HttpContext.Response.Cookies.Delete("blocked");
            HttpContext.Response.Cookies.Delete("imagePath");
            HttpContext.Response.Cookies.Delete("bodyskin");
            return RedirectToAction("Index", "Home");
        }
    }
}
