using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using project.Models.DataModels;
namespace project.Models
{
    public static class LoadingData
    {
        public static List<user> loadingdata()
        {
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "Data", "admin", "userdata")).ToList();
            if (filePaths.Count == 0)
            {
                return null ;
            }
            else
            {
                string jsonFilePath = filePaths[0];
                string vv = System.IO.File.ReadAllText(jsonFilePath);
                var userlist = Newtonsoft.Json.JsonConvert.DeserializeObject<List<user>>(vv);
                return userlist;
            }
        }
        public static List<onlinelist> onlinelist()
        {
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "Data", "admin", "onlinelist")).ToList();
            if (filePaths.Count == 0)
            {
                return null;
            }
            else
            {
                string jsonFilePath = filePaths[0];
                string vv = System.IO.File.ReadAllText(jsonFilePath);
                var onlinelist = Newtonsoft.Json.JsonConvert.DeserializeObject<List<onlinelist>>(vv);
                return onlinelist;
            }
        }
        public static List<root> LoadingRoot()
        {
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "Data", "admin", "root")).ToList();
            if (filePaths.Count == 0)
            {
                return null;
            }
            else
            {
                string jsonFilePath = filePaths[0];
                string vv = System.IO.File.ReadAllText(jsonFilePath);
                var rootlist = Newtonsoft.Json.JsonConvert.DeserializeObject<List<root>>(vv);
                return rootlist;
            }

        }
    }
}
