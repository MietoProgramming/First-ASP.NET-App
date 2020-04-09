using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoImagePlatform.Models;

namespace VideoImagePlatform.Controllers
{
    public class SearchController : Controller
    {
        private readonly ApplicationDbContext _db;
        public SearchController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index(string? searchText)
        {
            if (searchText != null)
            {
                searchText = CleanInput(searchText);
                ListImageVideoModel list = new ListImageVideoModel();
                list.ListVideos = _db.Videos.OrderByDescending(v => v.Views).Where(s => s.Name.ToLower().Contains(searchText.ToLower()) || s.Description.ToLower().Contains(searchText.ToLower())).ToList();
                list.ListImages = _db.Images.OrderByDescending(v => v.Views).Where(s => s.Name.ToLower().Contains(searchText.ToLower()) || s.Description.ToLower().Contains(searchText.ToLower())).ToList();
                return View(list);
            }
            return Redirect("/Home/Index");
        }

        static string CleanInput(string strIn)
        {
            try
            {
                return Regex.Replace(strIn, @"[^\w\.@-]", "",
                                     RegexOptions.None, TimeSpan.FromSeconds(1.5));
            }
            catch (RegexMatchTimeoutException)
            {
                return String.Empty;
            }
        }
    }
}