using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{
    public class VirtualFileProvider : IVirtualFileProvider
    {

        // Store dependencies
        private readonly string _webRootPath;

        // Map virtual directories
        private readonly Dictionary<string, string> _virtualDirectories = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
            { "Images", @"\\192.168.1.1\images" }
        };

        public VirtualFileProvider(string webRootPath)
        {
            _webRootPath = webRootPath;
        }

        public string MapPath(string path)
        {

            // Validate path
            if (String.IsNullOrEmpty(path) || !path.StartsWith("/", StringComparison.Ordinal))
            {
                throw new ArgumentException($"The '{path}' should be root relative, and start with a '/'.");
            }

            // Translate path to UNC format
            path = path.Replace("/", @"\", StringComparison.Ordinal);

            // Isolate first folder (or file)
            var firstFolder = path.IndexOf(@"\", 1);
            if (firstFolder < 0)
            {
                firstFolder = path.Length;
            }

            // Parse root directory from remainder of path
            var rootDirectory = path.Substring(1, firstFolder - 1);
            var relativePath = path.Substring(firstFolder);

            // Return virtual directory
            if (_virtualDirectories.ContainsKey(rootDirectory))
            {
                return _virtualDirectories[rootDirectory] + relativePath;
            }

            // Return non-virtual directory
            return _webRootPath + @"\" + rootDirectory + relativePath;

        }

    }
}
