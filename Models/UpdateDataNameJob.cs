using Quartz;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{
    internal class UpdateDataNameJob :IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            await Task.Run(() =>
            {
                //JobDataMap dataMap = context.JobDetail.JobDataMap;
                //string jobSays = dataMap.GetString("filename");
                List<string> filePaths = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "wwwroot", "Data", "admin", "foldername")).ToList();
                string newfilename = GenerateRandomString.RandomString(10);
                string oldfile = filePaths[0];
                string newfile = Path.Combine(Environment.CurrentDirectory, "wwwroot", "Data","admin","foldername", String.Format("{0}.json", newfilename));
                //dataMap.Put("filename", newfilename);
                
                System.Console.WriteLine(newfile);
                File.Move(oldfile, newfile);
            }, context.CancellationToken);
            
        }
    }
}
