using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
namespace project.Models
{
    public interface IVirtualFileProvider
    {
        string MapPath(string path);
    }
}
