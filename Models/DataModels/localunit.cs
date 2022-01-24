using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project.Models;
namespace project.Models.DataModels
{
    public class localunit
    {
        public List<identityuser> identity { get; set; }
        public List<identityuser> tobeconfirmed { get; set; }
        public string name { get; set; }
        public string tax { get; set; }
        public string cel { get; set; }
        public Tel tel { get; set; }
        public Fax fax { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string lastedittime { get; set; }
        public identityuser lastedituser { get; set; }
    }
}
