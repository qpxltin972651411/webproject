using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace project.Controllers
{
    public class DeniedController : Controller
    {
        private ClaimsPrincipal _cookies;
        public DeniedController(IHttpContextAccessor httpContextAccessor)
        {
            _cookies = httpContextAccessor.HttpContext.User;
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
            if (_cookies.Claims.FirstOrDefault(x => x.Type == "blocked").Value == "False")
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
    }
}
