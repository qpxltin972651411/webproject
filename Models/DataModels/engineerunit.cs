using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models.DataModels
{
        public class engineerunit
        {
            public List<identityuser> identity { get; set; }
            public int id { get; set; }
            public string name { get; set; }
            public string tax { get; set; }
            public string cel { get; set; }
            public Tel tel { get; set; }
            public Fax fax { get; set; }
            public string country { get; set; }
            public string city { get; set; }
            public string address { get; set; }
            public string lastedittime { get; set; }
            public string folderID { get; set; }
            public string unittype { get; set; }
            public identityuser lastedituser { get; set; }

        }
}
