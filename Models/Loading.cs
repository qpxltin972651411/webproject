using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using project.Models.DataModels;
namespace project.Models
{
    public static class Loading
    {
        public static List<user> userdata()
        {
            string userdatatext = null;
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "userdata")).ToList();
            if (filePaths.Count == 0)
                return null;
            try
            {
                using (var stream = File.Open(filePaths[0], FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        userdatatext = reader.ReadToEnd();
                    }
                }
                //string userdatatext = File.ReadAllText(filePaths[0]);
                List<user> userlist = JsonConvert.DeserializeObject<List<user>>(userdatatext);

                return userlist;
            }
            catch (IOException e)
            {
                return Loading.userdata();
            }

        }
        public static List<onlinelist> onlinelist()
        {
            string onlinelisttext = null;
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "onlinelist")).ToList();
            if (filePaths.Count == 0)
                return null;
            try
            {
                using (var stream = File.Open(filePaths[0], FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        onlinelisttext = reader.ReadToEnd();
                    }
                }
                //string onlinelisttext = File.ReadAllText(filePaths[0]);
                List<onlinelist> onlinelist = JsonConvert.DeserializeObject<List<onlinelist>>(onlinelisttext);
                return onlinelist;
            }
            catch (IOException e)
            {
                return onlinelist();
            }

        }
        public static List<root> rootdata()
        {
            string rootdatatext = null;
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "root")).ToList();
            if (filePaths.Count == 0)
                return null;
            try
            {
                using (var stream = File.Open(filePaths[0], FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        rootdatatext = reader.ReadToEnd();
                    }
                }
                //string rootdatatext = File.ReadAllText(filePaths[0]);
                List<root> rootlist = Newtonsoft.Json.JsonConvert.DeserializeObject<List<root>>(rootdatatext);
                return rootlist;
            }
            catch (IOException e)
            {
                return Loading.rootdata();
            }
        }
        public static List<engineerunit> engineerunits()
        {
            string engineerunits = null;
            List<engineerunit> engineerunitlist = null;
            List<string> folderpaths = Directory.GetDirectories(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer"), "*", SearchOption.TopDirectoryOnly).ToList();
            foreach (var folder in folderpaths)
            {
                List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer", folder)).ToList();
                if (filePaths.Count == 0)
                    continue;
                try
                {
                    using (var stream = File.Open(filePaths[0], FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        using (StreamReader reader = new StreamReader(stream))
                        {
                            engineerunits = reader.ReadToEnd();
                        }
                    }
                    //string localunittext = File.ReadAllText(filePaths[0]);
                    List<engineerunit> temp = JsonConvert.DeserializeObject<List<engineerunit>>(engineerunits);
                    if (engineerunitlist == null)
                    {
                        engineerunitlist = temp;
                    }
                    else
                    {
                        engineerunitlist = engineerunitlist.Concat(temp).ToList();
                    }
                }
                catch (IOException e)
                {
                    return Loading.engineerunits();
                }
            }
            return engineerunitlist;
        }
        public static List<localunit> localunit()
        {
            string localunittext = null;
            if (!Directory.Exists(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "local")))
            {
                Directory.CreateDirectory(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "local"));
                return null;
            }
                
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "local")).ToList();
            if (filePaths.Count == 0)
                return null;
            try
            {
                using (var stream = File.Open(filePaths[0], FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        localunittext = reader.ReadToEnd();
                    }
                }
                //string localunittext = File.ReadAllText(filePaths[0]);
                List<localunit> localunitlist = Newtonsoft.Json.JsonConvert.DeserializeObject<List<localunit>>(localunittext);
                return localunitlist;
            }
            catch (IOException e)
            {
                return Loading.localunit();
            }
        }
        public static List<string> CountryList()
        {
            string json = null;
            string filepath = Path.Combine(Environment.CurrentDirectory, "wwwroot", "opendata110road_normal.json");

            try
            {
                using (var stream = File.Open(filepath, FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        json = reader.ReadToEnd();
                    }
                }
                //var json = File.ReadAllText(Path.Combine(Environment.CurrentDirectory, "wwwroot", "opendata110road_normal.json"));
                var ctlist = JsonConvert.DeserializeObject<List<road>>(json);
                List<string> country = new List<string>();
                foreach (var child in ctlist)
                {
                    if (!country.Contains(child.country))
                        country.Add(child.country);
                }
                return country;
            }
            catch (IOException e)
            {
                return Loading.CountryList();
            }
        }
        public static void createuserdata(List<user> userlist)
        {
            string filename = Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "userdata", String.Format("{0}.json", GenerateRandomString.RandomString(20)));
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(filename))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, userlist);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", filename, e.Message);
            }
            finally
            {
                //pass
            }
        }
        public static void writeuserdata(List<user> userlist)
        {

            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "userdata")).ToList();
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(filePaths[0]))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, userlist);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", filePaths[0], e.Message);
            }
            finally
            {
                //pass
            }
        }
        public static void createlocalunit(List<localunit> localunitlist)
        {
            string filename = Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "local", String.Format("{0}.json", GenerateRandomString.RandomString(20)));
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(filename))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, localunitlist);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", filename, e.Message);
            }
            finally
            {
                //pass
            }
        }
        public static void writelocalunit(List<localunit> localunitlist)
        {
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "local")).ToList();
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(filePaths[0]))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, localunitlist);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", filePaths[0], e.Message);
            }
            finally
            {
                //pass
            }
        }
        public static void createonlinelist(List<onlinelist> onlinelist)
        {
            string create_txt = Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "onlinelist", String.Format("{0}.json", GenerateRandomString.RandomString(20)));
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(create_txt))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, onlinelist);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", create_txt, e.Message);
            }
            finally
            {
                //pass
            }
        }
        public static void writeonlinelist(List<onlinelist> onlinelist)
        {

            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "onlinelist")).ToList();
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(filePaths[0]))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, onlinelist);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", filePaths[0], e.Message);
            }
            finally
            {
                //pass
            }
        }

        public static void writerootdata(List<root> rootdata)
        {
            List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "admin", "root")).ToList();
            try
            {
                using (StreamWriter file = System.IO.File.CreateText(filePaths[0]))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, rootdata);
                    file.Close();
                }
            }
            catch (System.IO.IOException e)
            {
                Console.WriteLine("Error reading from {0}. Message = {1}", filePaths[0], e.Message);
            }
            finally
            {
                //pass
            }
        }


        //engineer write/read/create
        public static void edit_engineerunit(engineerunit engineerdata,identityuser edituser)
        {
            List<engineerunit> engineerunitlist = null;
            string engineerunittext = "";
            try
            {
                using (var stream = File.Open(engineerdata.folderID, FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        engineerunittext = reader.ReadToEnd();
                    }
                }
                engineerunitlist = JsonConvert.DeserializeObject<List<engineerunit>>(engineerunittext);
                foreach (var child in engineerunitlist)
                {
                    if (child.id == engineerdata.id)
                    {
                        child.tax = engineerdata.tax;
                        child.unittype = engineerdata.unittype;
                        child.name = engineerdata.name;
                        child.cel = engineerdata.cel;
                        child.tel.areacode = engineerdata.tel.areacode;
                        child.tel.number = engineerdata.tel.number;
                        child.fax.areacode = engineerdata.fax.areacode;
                        child.fax.number = engineerdata.fax.number;
                        child.country = engineerdata.country;
                        child.city = engineerdata.city;
                        child.address = engineerdata.address;
                        child.lastedittime = DateTime.Now.ToString();
                        child.lastedituser = edituser;
                        break;
                    }
                }
                using (StreamWriter file = File.CreateText(engineerdata.folderID))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, engineerunitlist);
                    file.Close();
                }
            }
            catch (IOException e)
            {
                Console.WriteLine("Error reading from {0}", e.Message);
                writeengineerunit(engineerdata);
                edit_engineerunit(engineerdata, edituser);
            }
            finally
            {

            }
        }
        public static void writeengineerunit(engineerunit engineerdata)
        {
            string engineerunittext = "";
            List<string> folderlist = Directory.GetDirectories(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer")).ToList();
            string write_full_path = null;
            List<engineerunit> engineerunitlist = null;
            try
            {
                foreach (var folder in folderlist)
                {
                    List<string> filePaths = Directory.GetFiles(folder).ToList();
                    using (var stream = File.Open(filePaths[0], FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        using (StreamReader reader = new StreamReader(stream))
                        {
                            engineerunittext = reader.ReadToEnd();
                        }
                    }
                    engineerunitlist = JsonConvert.DeserializeObject<List<engineerunit>>(engineerunittext);
                    if (engineerunitlist == null || engineerunitlist.Count < 100)
                    {
                        write_full_path = filePaths[0];
                        break;
                    }
                }
                if (write_full_path == null)
                {
                    write_full_path = createnewfolder();
                    write_full_path = Path.Combine(write_full_path, String.Format("{0}.json", GenerateRandomString.RandomString(20)));
                    List<engineerunit> newlist = new List<engineerunit>();
                    engineerdata.id = (folderlist.Count) * 100 + 1;
                    engineerdata.folderID = write_full_path;
                    newlist.Add(engineerdata);
                    using (StreamWriter file = File.CreateText(write_full_path))
                    {
                        JsonSerializer serializer = new JsonSerializer();
                        serializer.Serialize(file, newlist);
                        file.Close();
                    }
                }
                else
                {
                    engineerdata.folderID = write_full_path;
                    engineerdata.id = (folderlist.Count - 1) * 100 + engineerunitlist.Count + 1;
                    engineerunitlist.Add(engineerdata);
                    using (StreamWriter file = File.CreateText(write_full_path))
                    {
                        JsonSerializer serializer = new JsonSerializer();
                        serializer.Serialize(file, engineerunitlist);
                        file.Close();
                    }
                }
            }
            catch (IOException e)
            {
                Console.WriteLine("Error reading from {0}",  e.Message);
                writeengineerunit(engineerdata);
            }
            finally
            {
                //pass
            }

        }
        public static string createnewfolder()
        {
            string foldername = GenerateRandomString.RandomString(20);
            string[] folderlist = Directory.GetDirectories(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer"), "*", SearchOption.TopDirectoryOnly);
            foreach (var child in folderlist)
            {
                if (foldername.Equals(child))
                {
                    return createnewfolder();
                }
            }
            string full_path = Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer", foldername);
            Directory.CreateDirectory(full_path);
            return full_path;
        }
        public static void create_engineer_unit_folder(engineerunit store_data)
        {
            List<engineerunit> store_list = new List<engineerunit>();
            string new_folder_name = GenerateRandomString.RandomString(20);
            string full_path = Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer", new_folder_name,String.Format("{0}.json",GenerateRandomString.RandomString(20)));
            store_data.id = 1;
            store_data.folderID = full_path;
            store_list.Add(store_data);
            try
            {
                Directory.CreateDirectory(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer", new_folder_name));
                using (StreamWriter file = File.CreateText(full_path))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, store_list);
                    file.Close();
                }
            }catch (IOException e)
            {
                clear_All_engineer_unit_folder();
                create_engineer_unit_folder(store_data);
            }
            finally
            {

            }
        }
        public static void clear_All_engineer_unit_folder()
        {
            List<string> folderlist = Directory.GetDirectories(Path.Combine(Environment.CurrentDirectory, "wwwroot", "data", "engineer"), "*", SearchOption.TopDirectoryOnly).ToList();
            if (folderlist.Count > 0)
                foreach (var folder in folderlist)
                    Directory.Delete(folder, true);
        }
    }
}
