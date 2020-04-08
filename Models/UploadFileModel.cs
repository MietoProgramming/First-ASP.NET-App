using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VideoImagePlatform.Models
{
    public class UploadFileModel
    {
        public IFormFile files { get; set; }
        public string changedname { get; set; }
        public string description { get; set; }

    }
}
