using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Net.Mail;
using System.Text;
using System.Web;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using project.Models.DataModels;
using Microsoft.AspNetCore.Hosting;

namespace project.Controllers
{
    public class SignupController : Controller
    {
        private List<user> userlist;
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
        public SignupController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env)
        {
            _cookies = httpContextAccessor.HttpContext.User;
            _env = env;
        }

        [HttpGet]
        public IActionResult Index()
        {
            int ln = _cookies.Claims.ToList().Count();
            //var identity = (ClaimsIdentity)User.Identity;
            //IEnumerable<Claim> claims = identity.Claims;
            if (ln > 0)
            {
                return RedirectToAction("Index", "Home"); 
            }
            return View();
        }
        [HttpGet]
        [Authorize]
        public IActionResult Successful()
        {
            int ln = _cookies.Claims.ToList().Count;
            if (ln > 0)
            {
                //Refreshcookies();
                if (_cookies.Claims.FirstOrDefault(x => x.Type == "certification").Value == "True")
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    /*System.Net.Mail.SmtpClient MySmtp = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587);
                    MySmtp.Credentials = new System.Net.NetworkCredential("4a7g0103@stust.edu.tw", "TheKingOfBronze5284");
                    MySmtp.EnableSsl = true;
                    MailMessage mail = new MailMessage();
                    mail.From = new MailAddress("4a7g0103@stust.edu.tw", "資料開放平台");
                    mail.IsBodyHtml = true;
                    string email = _cookies.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
                    mail.To.Add(email);
                    mail.Priority = MailPriority.Normal;
                    mail.Subject = "資料開放平台通知 - 驗證帳號";
                    mail.Body = "您剛已在平台上註冊帳號，點擊以下連結以驗證帳號<br/>";
                    var body = new StringBuilder();
                    string nickname = _cookies.Identity.Name;
                    body.AppendFormat("您好, {0}<br/><br/>", nickname);
                    body.AppendLine(@"您剛已在平台上註冊帳號，若要繼續使用平台，點擊以下連結以驗證帳號<br/><br/>");

                    string acc = _cookies.Claims.FirstOrDefault(x => x.Type == "Account").Value;
                    string urlstring = "None";
                    List<VerifyRecord> lists = _context.identityLink.ToList();
                    foreach (VerifyRecord e in lists)
                    {
                        if (e.account == acc)
                        {
                            urlstring = e.link;
                            break;
                        }
                    }
                    var url = Url.Action("verify", "confirm", new { account = acc, link = urlstring }, Request.Scheme);
                    var IP = _config.GetSection("serverIP").Get<string>();
                    //url = url.Replace("https://localhost:44378/", IP + "/syntax/");
                    string FormatURLString = String.Format("<a href=\"\">驗證連結點此</a><br/><br/>", url);
                    body.AppendLine(FormatURLString);
                    body.AppendLine(@"若連結無效，請複製下方連結並搜尋<br/><br/>");
                    body.AppendLine(url);
                    mail.Body = body.ToString();
                    MySmtp.Send(mail);*/
                    //VerifyRecord rec = new VerifyRecord
                    //{
                    //    link = urlstring,
                    //    account = acc,
                    //};
                    //ViewData["message"] = rec;
                    return View();
                }
            }
            else
            {
                return RedirectToAction("Index","Error");
            }
            
        }
        [HttpGet]
        public IActionResult Createuser()
        {
            return RedirectToAction("Index", "Error");
        }
        public user GenerateNewUser(IFormCollection formdata)
        {
            user newuser = new user();
            Random rnd = new Random();

            // ==> encode acccount <== //
            newuser.aentime = rnd.Next(20, 41);
            string normalaccount = formdata["account"];
            newuser.enaccount = GenerateRandomString.RandomString(newuser.aentime);
            for (int i = 0; i < newuser.aentime; i++)
                normalaccount = endecryption.encryption(normalaccount + newuser.enaccount[i]);
            newuser.account = normalaccount;
            // ==> encode acccount <== //

            // ==> encode password <== //
            newuser.pentime = rnd.Next(20, 41);
            string normalpassword = formdata["pass"];
            newuser.enpassword = GenerateRandomString.RandomString(newuser.pentime);
            for (int i = 0; i < newuser.pentime; i++)
                normalpassword = endecryption.encryption(normalpassword + newuser.enpassword[i]);
            newuser.password = normalpassword;
            // ==> encode password <== //

            newuser.email = formdata["email"];
            newuser.nickname = formdata["nickname"];
            newuser.certification = false;
            newuser.blocked = false;
            newuser.bodyskin = "skin-tectile";
            //add factory here
            newuser.imagePath = String.Format("{0}{1}", URLrootPath(), "/img/user/user.png");
            return newuser;
        }
        [HttpPost]
        public async Task<IActionResult> CreateuserAsync(IFormCollection formdata)
        {

            userlist = Loading.userdata();
            if (userlist != null)
            {
                foreach (var child in userlist)
                {
                    string enaccstring = endecryption.encode(child.aentime, child.account);
                    if (enaccstring.Equals(formdata["account"]))
                    {
                        TempData["message"] = "* 帳號已被註冊";
                        return RedirectToAction("Index", "Signup");
                    }
                    if (child.email.Equals(formdata["email"]))
                    {
                        TempData["message"] = "* 信箱已被使用";
                        return RedirectToAction("Index", "Signup");
                    }  
                }
                var newuser = GenerateNewUser(formdata);
                userlist.Add(newuser);

                Loading.writeuserdata(userlist);

                List<Claim> SendToCookies = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name,newuser.nickname),
                    new Claim("certification",newuser.certification.ToString()),
                    new Claim("emailaddress",newuser.email),
                    new Claim("usertype","normal"),
                    new Claim("blocked",newuser.blocked.ToString()),
                    new Claim("imagePath",newuser.imagePath),
                };
                var useridentity = new ClaimsIdentity(SendToCookies, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(useridentity)
                );
                HttpContext.Response.Cookies.Append("name", newuser.nickname);
                HttpContext.Response.Cookies.Append("email", newuser.email);
                HttpContext.Response.Cookies.Append("certification", newuser.certification.ToString());
                HttpContext.Response.Cookies.Append("usertype", "normal");
                HttpContext.Response.Cookies.Append("blocked", newuser.blocked.ToString());
                HttpContext.Response.Cookies.Append("imagePath", newuser.imagePath);
                HttpContext.Response.Cookies.Append("bodyskin", newuser.bodyskin);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                userlist = new List<user>();
                var newuser = GenerateNewUser(formdata);
                userlist.Add(newuser);
                Loading.createuserdata(userlist);
                List<Claim> SendToCookies = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name,newuser.nickname),
                    new Claim("certification",newuser.certification.ToString()),
                    new Claim("emailaddress",newuser.email),
                    new Claim("usertype","normal"),
                    new Claim("blocked",newuser.blocked.ToString()),
                    new Claim("imagePath",newuser.imagePath),
                };
                var useridentity = new ClaimsIdentity(SendToCookies, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(useridentity)
                );
                HttpContext.Response.Cookies.Append("name", newuser.nickname);
                HttpContext.Response.Cookies.Append("email", newuser.email);
                HttpContext.Response.Cookies.Append("certification", newuser.certification.ToString());
                HttpContext.Response.Cookies.Append("usertype", "normal");
                HttpContext.Response.Cookies.Append("blocked", newuser.blocked.ToString());
                HttpContext.Response.Cookies.Append("imagePath", newuser.imagePath);
                HttpContext.Response.Cookies.Append("bodyskin", newuser.bodyskin);
                return RedirectToAction("Index","Home");
            }
        }
    }
}
