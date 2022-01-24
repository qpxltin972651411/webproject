using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models.DataModels
{
    public class user
    {
        public string account { get; set; }
        public string enaccount { get; set; }
        public string password { get; set; }
        public string enpassword { get; set; }
        public string email { get; set; }
        public string nickname{ get; set;}
        public int aentime { get; set; }
        public int pentime { get; set; }
        public bool certification { get; set; }
        public bool blocked { get; set; }
        public string imagePath { get; set; }
        public string bodyskin { get; set; }
    }
}
