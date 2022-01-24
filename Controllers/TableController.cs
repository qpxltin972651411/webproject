using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using project.Models;
using Microsoft.AspNetCore.Authorization;
using project.Models.DataModels;
namespace project.Controllers
{    
    public class TableController : Controller
    {
        [Authorize]
        [HttpGet]
        public IActionResult Index()
        {
            var json = System.IO.File.ReadAllText(Path.Combine(Environment.CurrentDirectory,"wwwroot","opendata110road_normal.json"));
            var people = Newtonsoft.Json.JsonConvert.DeserializeObject<List<road>>(json);
            List<string> countrys = new List<string>();
            foreach (var l in people)
            {
                if (!countrys.Contains(l.country))
                {
                    countrys.Add(l.country);
                }
            }

            /*string jsonFilePath = Path.Combine(Environment.CurrentDirectory, "wwwroot", "Data","factory.json");
            string vv = System.IO.File.ReadAllText(jsonFilePath);
            var company = Newtonsoft.Json.JsonConvert.DeserializeObject<List<company>>(vv);
            foreach (var l in company)
            {
                Byte[] bytesDecode = Convert.FromBase64String(l.name); // 還原 Byte
                string resultText = System.Text.Encoding.UTF8.GetString(bytesDecode); // 還原 UTF8 字元
            }*/

            
            return View();
        }
    }
}
