using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using project.Models.DataModels;
using project.Models;
using System.Text.RegularExpressions;

namespace project.Controllers
{
    public class EngineerunitController : Controller
    {
        private List<engineerunit> engineerunitlist = null;
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
        public EngineerunitController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env)
        {
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
            EngineerunitTable SendToEngineerunitTable = new EngineerunitTable();
            SendToEngineerunitTable.countrylist = Loading.CountryList();

            var engineerunitlist = Loading.engineerunits();
            if (engineerunitlist == null)
                return View(SendToEngineerunitTable);
            SendToEngineerunitTable.data = engineerunitlist;

            return View(SendToEngineerunitTable);
        }
        [Authorize]
        [HttpGet]
        public IActionResult createengineer()
        {
            return RedirectToAction("Index", "Error");
        }
        [Authorize]
        [HttpPost]
        public IActionResult createengineer(engineerreceiveData formdata)
        {
            if (formdata == null)
                return RedirectToAction("Index", "Engineerunit");
            
            engineerunit new_unit = GenerateNewengineerunit(formdata);
            engineerunitlist = Loading.engineerunits();
            if (engineerunitlist != null)
            {
                foreach (var child in engineerunitlist)
                {
                    if (new_unit.unittype == "tax")
                    {
                        if (child.tax == new_unit.tax)
                        {
                            //重複新增工程單位
                            TempData["message"] = "統編重複存在";
                            return RedirectToAction("Index", "Engineerunit");
                        }
                    }
                    else
                    {
                        if (child.name == new_unit.name)
                        {
                            //重複新增工程單位
                            TempData["message"] = "名稱重複存在";
                            return RedirectToAction("Index", "Engineerunit");
                        }
                    }
                }
                //engineerunitlist.Add(new_unit);
                Loading.writeengineerunit(new_unit);
            }
            else
            {
                //engineerunitlist = new List<engineerunit>();
                //engineerunitlist.Add(new_unit);
                Loading.clear_All_engineer_unit_folder();           //清空所有engineer unit folder file 
                Loading.create_engineer_unit_folder(new_unit);      //新增一個資料夾 一個檔案 創建LIST<engineerunit> 寫進檔案 若有例外錯誤 清空重新呼叫
            }
            /*for (var times = 0; times < 500; times++)
            {
                formdata.newname = GenerateRandomString.RandomString(7);
                new_unit = GenerateNewengineerunit(formdata);
                engineerunitlist = Loading.engineerunits();
                if (engineerunitlist != null)
                {
                    foreach (var child in engineerunitlist)
                    {
                        if (new_unit.unittype == "tax")
                        {
                            if (child.tax == new_unit.tax)
                            {
                                //重複新增工程單位
                                TempData["message"] = "統編重複存在";
                                return RedirectToAction("Index", "Engineerunit");
                            }
                        }
                        else
                        {
                            if (child.name == new_unit.name)
                            {
                                //重複新增工程單位
                                TempData["message"] = "名稱重複存在";
                                return RedirectToAction("Index", "Engineerunit");
                            }
                        }
                    }
                    //engineerunitlist.Add(new_unit);
                    Loading.writeengineerunit(new_unit);
                }
                else
                {
                    //engineerunitlist = new List<engineerunit>();
                    //engineerunitlist.Add(new_unit);
                    Loading.clear_All_engineer_unit_folder();           //清空所有engineer unit folder file 
                    Loading.create_engineer_unit_folder(new_unit);      //新增一個資料夾 一個檔案 創建LIST<engineerunit> 寫進檔案 若有例外錯誤 清空重新呼叫
                }
            }*/
            return RedirectToAction("Index", "Engineerunit");
        }
        public Tel generate_tel(engineerreceiveData formdata)
        {
            Tel new_tel = new Tel();
            if (formdata.newtelareacode != null)
                new_tel.areacode = formdata.newtelareacode;
            else
                new_tel.areacode = "";
            if (formdata.newtelcode != null)
                new_tel.number = formdata.newtelcode;
            else
                new_tel.number = "";
            return new_tel;
        }
        public Fax generate_fax(engineerreceiveData formdata)
        {
            Fax new_fax = new Fax();
            if (formdata.newfaxareacode != null)
                new_fax.areacode = formdata.newfaxareacode;
            else
                new_fax.areacode = "";
            if (formdata.newfaxcode != null)
                new_fax.number = formdata.newfaxcode;
            else
                new_fax.number = "";
            return new_fax;
        }
        public engineerunit GenerateNewengineerunit(engineerreceiveData formdata)
        {
            engineerunit new_unit = new engineerunit();
            new_unit.address = formdata.newaddress;
            new_unit.city = formdata.newcity;
            new_unit.country = formdata.newcountry;
            new_unit.unittype = formdata.newChoices;
            if (formdata.newcel != null)
                new_unit.cel = formdata.newcel;
            else
                new_unit.cel = "";
            new_unit.tel = generate_tel(formdata);
            new_unit.fax = generate_fax(formdata);
            new_unit.name = formdata.newname;
            new_unit.tax = formdata.newtax;
            new_unit.lastedittime = DateTime.Now.ToString();

            List<identityuser> lst = new List<identityuser>();

            identityuser adm = new identityuser();
            var admlist = Loading.rootdata();
            if (admlist != null)
            {
                adm.name = admlist[0].nickname;
                adm.email = admlist[0].email;
            }
            lst.Add(adm);

            if (HttpContext.Request.Cookies["email"] != adm.email)
            {
                identityuser normal_user = new identityuser();
                normal_user.name = HttpContext.Request.Cookies["name"];
                normal_user.email = HttpContext.Request.Cookies["email"];
                lst.Add(normal_user);
            }
            new_unit.identity = lst;

            identityuser lastedituser = new identityuser();
            lastedituser.name = HttpContext.Request.Cookies["name"];
            lastedituser.email = HttpContext.Request.Cookies["email"];
            new_unit.lastedituser = lastedituser;

            return new_unit;
        }
        [Authorize]
        [HttpGet]
        public IActionResult editdata()
        {
            return RedirectToAction("Index", "Error");
        }
        [Authorize]
        [HttpPost]
        public IActionResult editdata(IFormCollection data)
        {
            engineerunit edit_data = new engineerunit();
            edit_data.tel = new Tel();
            edit_data.fax = new Fax();
            foreach (var key in data.Keys)
            {
                Regex re = new Regex(@"([a-zA-Z]+)(\d+)");
                Match result = re.Match(key);
                string alphaPart = result.Groups[1].Value;
                string numberPart = result.Groups[2].Value;
                if (alphaPart.Equals("name"))
                    edit_data.name = data[key];
                if (alphaPart.Equals("choices"))
                    edit_data.unittype = data[key];
                if (alphaPart.Equals("tax"))
                    edit_data.tax = data[key];
                if (alphaPart.Equals("cel"))
                    edit_data.cel = data[key];

                if (alphaPart.Equals("telareacode"))
                    edit_data.tel.areacode = data[key];

                if (alphaPart.Equals("telcode"))
                    edit_data.tel.number = data[key];

                if (alphaPart.Equals("faxareacode"))
                    edit_data.fax.areacode = data[key];

                if (alphaPart.Equals("faxcode"))
                    edit_data.fax.number = data[key];
                if (alphaPart.Equals("country"))
                    edit_data.country = data[key];
                if (alphaPart.Equals("city"))
                    edit_data.city = data[key];
                if (alphaPart.Equals("address"))
                    edit_data.address = data[key];
                if (alphaPart.Equals("folder"))
                    edit_data.folderID = data[key];
                if (alphaPart.Equals("rowid"))
                    edit_data.id = Convert.ToInt32(data[key].ToList()[0]);
            }
            identityuser edituser = new identityuser();
            edituser.name = HttpContext.Request.Cookies["name"];
            edituser.email = HttpContext.Request.Cookies["email"];
            Loading.edit_engineerunit(edit_data,edituser);
            return RedirectToAction("Index", "Engineerunit");
        }
    }
}
