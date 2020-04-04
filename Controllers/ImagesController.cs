using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoImagePlatform.Models;

namespace VideoImagePlatform.Controllers
{
    public class ImagesController : Controller
    {
        private readonly ApplicationDbContext _db;

        public Image Image { get; set; }

        public ImagesController(ApplicationDbContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}