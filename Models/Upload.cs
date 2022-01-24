using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{
    public static class Upload
    {
        public static async Task<string> fileAsync(IFormFileCollection files)
        {
            var path = "";
            if (files.Count == 0)
                return path;
            var f = files[0];
            if (f.Length > 0)
            {
                var spt = f.FileName.Split(".");
                var filetype = spt[spt.Length - 1];
                path = Path.Combine(Environment.CurrentDirectory, "wwwroot", "img", "user", String.Format("{0}.{1}", GenerateRandomString.RandomString(10), filetype));
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await f.CopyToAsync(stream);
                }
            }
            return path;
        }
    }
}
