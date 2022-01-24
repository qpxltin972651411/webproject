using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using project.Models;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using project.Models.DataModels;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;
using System.Text.RegularExpressions;
using OfficeOpenXml;
namespace project.Controllers
{

    public class DataViewController : Controller
    {
        private List<localunit> localunitlist = null;
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
        public DataViewController(IHttpContextAccessor httpContextAccessor,IWebHostEnvironment env)
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
            DataviewTable SendToDataViewTable = new DataviewTable();
            SendToDataViewTable.countrylist = Loading.CountryList();
            /*ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var filepath = new FileInfo(Path.Combine(WebStaticPath(),"test.xlsx")); // 檔案路徑
            using (var excel = new ExcelPackage())
            {
                // 建立分頁
                var ws = excel.Workbook.Worksheets.Add("MySheet");

                // 寫入資料試試
                ws.Cells[2, 1].Value = "測試測試";
                ws.Cells[2,1].Style.
                // 儲存 Excel
                excel.SaveAs(filepath);
            }*/
            var localunitlist =Loading.localunit();
            if (localunitlist == null)
                return View(SendToDataViewTable);
            SendToDataViewTable.data = localunitlist;

            return View(SendToDataViewTable);
        }
        public Tel generate_tel(receiveData formdata)
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
        public Fax generate_fax(receiveData formdata)
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
        public localunit GenerateNewlocalunit(receiveData formdata)
        {
            localunit new_unit = new localunit();
            new_unit.address = formdata.newaddress;
            new_unit.city = formdata.newcity;
            new_unit.country = formdata.newcountry;
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
            var admlist =Loading.rootdata();
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

            List<identityuser> empty_tobeconfirmed = new List<identityuser>();
            new_unit.tobeconfirmed = empty_tobeconfirmed;
            identityuser lastedituser = new identityuser();
            lastedituser.name = HttpContext.Request.Cookies["name"];
            lastedituser.email = HttpContext.Request.Cookies["email"];
            new_unit.lastedituser = lastedituser;

            return new_unit;
        }
        [Authorize]
        [HttpGet]
        public IActionResult require_tobeconfirmed()
        {
            return RedirectToAction("Index", "Error");
        }
        [Authorize]
        [HttpPost]
        public IActionResult require_tobeconfirmed([FromForm]IFormCollection editdata)
        {
            List<localunit> localunitlist = Loading.localunit();
            var keylist = editdata.Keys;
            string alphaPart = null;
            string numberPart = null;
            foreach (var key in keylist)
            {
                Regex re = new Regex(@"([a-zA-Z]+)(\d+)");
                Match result = re.Match(key);
                if (result.Groups[1].Value.Equals("tobeconfirmed"))
                {
                    alphaPart = result.Groups[1].Value;
                    numberPart = result.Groups[2].Value;
                    break;
                }
            }
            return RedirectToAction("Index", "DataView");
        }
        [Authorize]
        [HttpGet]
        public IActionResult createunit()
        {
            return RedirectToAction("Index", "Error");
        }
        [Authorize]
        [HttpPost]
        public IActionResult createunit(receiveData formdata) {
            if (formdata == null)
                return RedirectToAction("Index", "DataView");

            localunit new_unit =GenerateNewlocalunit(formdata);
            localunitlist = Loading.localunit();
            if (localunitlist != null)
            {
                foreach (var child in localunitlist)
                {
                    if (child.name == new_unit.name || child.tax == new_unit.tax)
                    {
                        //重複新增本地單位
                        TempData["message"] = "名稱或統編重複存在";
                        return RedirectToAction("Index", "DataView");
                    }
                }
                localunitlist.Add(new_unit);
                Loading.writelocalunit(localunitlist);

            }
            else
            {
                localunitlist = new List<localunit>();
                localunit create_unit = GenerateNewlocalunit(formdata);
                localunitlist.Add(create_unit);

                Loading.createlocalunit(localunitlist);
            }
            return RedirectToAction("Index", "DataView");
        }
        [HttpPost]
        [Authorize]
        public IActionResult editlocalunit(IFormCollection editdata)
        {
            List<localunit> localunitlist = Loading.localunit();
            var keylist = editdata.Keys;
            string alphaPart = null;
            string numberPart = null;
            foreach (var key in keylist)
            {
                Regex re = new Regex(@"([a-zA-Z]+)(\d+)");
                Match result = re.Match(key);
                if (result.Groups[1].Value.Equals("tax"))
                {
                    alphaPart = result.Groups[1].Value;
                    numberPart = result.Groups[2].Value;
                    break;
                }
            }
            foreach (var child in localunitlist)
            {
                if (child.tax.Equals(editdata[alphaPart + numberPart]))
                    continue;
                if (child.name.Equals(editdata["name" + numberPart]))
                {
                    TempData["message"] = "[ 編輯失敗 ] - 名稱重複";
                    return RedirectToAction("Index", "DataView");
                }
            }
            foreach (var child in localunitlist)
            {
                //Console.WriteLine(child.Key, child.Value);
                string editpost = editdata[alphaPart + numberPart];
                if (child.tax.Equals(editpost))
                {
                    child.name = editdata["name" + numberPart];
                    child.cel = editdata["cel" + numberPart];
                    child.tel.areacode = editdata["telareacode" + numberPart];
                    child.tel.number = editdata["telcode" + numberPart];
                    child.fax.areacode = editdata["faxareacode" + numberPart];
                    child.fax.number = editdata["faxcode" + numberPart];
                    child.country = editdata["country" + numberPart];
                    child.city = editdata["city" + numberPart];
                    child.address = editdata["address" + numberPart];
                    child.lastedittime = DateTime.Now.ToString();
                    identityuser lastedituser = new identityuser();
                    lastedituser.name = HttpContext.Request.Cookies["name"];
                    lastedituser.email = HttpContext.Request.Cookies["email"];
                    child.lastedituser = lastedituser;
                    break;
                }
            }
            Loading.writelocalunit(localunitlist);
            TempData["message"] = "已更新資料";
            return RedirectToAction("Index", "DataView");
        }
    }
}
