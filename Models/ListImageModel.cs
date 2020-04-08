using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VideoImagePlatform.Models
{
    public class ListImageModel
    {
        public List<Image> newestImages { get; set; }

        public List<Image> bestImages { get; set; }

        public List<Image> allImages { get; set; }
    }
}
