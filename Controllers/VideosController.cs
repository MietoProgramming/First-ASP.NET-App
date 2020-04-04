using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoImagePlatform.Models;

namespace VideoImagePlatform.Controllers
{
    public class VideosController : Controller
    {
        private readonly ApplicationDbContext _db;

        public Video Video { get; set; }

        public VideosController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}