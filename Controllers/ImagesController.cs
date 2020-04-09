using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VideoImagePlatform.Models;

namespace VideoImagePlatform.Controllers
{
    public class ImagesController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;


        public Image Image { get; set; }

        public ImagesController(ApplicationDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }
        public async Task<IActionResult> Index()
        {
            ListImageModel listImage = new ListImageModel();
            listImage.newestImages = await _db.Images.OrderByDescending(i => i.Id).Take(10).ToListAsync();
            listImage.bestImages = await _db.Images.OrderByDescending(i => i.Views).Take(10).ToListAsync();
            listImage.allImages = await _db.Images.ToListAsync();
            return View(listImage);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(UploadFileModel model)
        {
            var name = model.changedname;
            var description = model.description;
            var files = model.files;
            string filename;// filename in directory
            string path;

            filename = ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');
            filename = this.EnsureCorrectFilename(filename);
            var uniqGuid = Guid.NewGuid().ToString();
            filename = uniqGuid + filename;
            path = this.GetPathAndFilename(filename);
            using (FileStream output = System.IO.File.Create(path))
                await files.CopyToAsync(output);

            // DB insert

            Image = new Image();
            if (ModelState.IsValid)
            {
                Image.Name = name;
                Image.Description = description;
                Image.Url = "/UploadedContent/uploadedImages/" + filename;
                Image.Views = 0;
                _db.Images.Add(Image);
                _db.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        public void ViewCount(string idS)
        {
            int? id = Convert.ToInt32(idS);
            if (id != null)
            {
                var image = _db.Images.First(v => v.Id == id);
                image.Views += 1;
                _db.SaveChanges();
            }
        }

        public void DeleteImage(string idS)
        {
            int? id = Convert.ToInt32(idS);
            if (id != null)
            {
                var image = _db.Images.First(v => v.Id == id);
                _db.Images.Remove(image);
                _db.SaveChanges();
            }
        }

        public void EditImage(string idS, string description, string name)
        {
            int? id = Convert.ToInt32(idS);
            if (id != null)
            {
                var image = _db.Images.First(v => v.Id == id);
                image.Description = description;
                image.Name = name;
                _db.SaveChanges();
            }
        }

        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }

        private string GetPathAndFilename(string filename)
        {
            return _env.WebRootPath + "\\UploadedContent\\uploadedImages\\" + filename;
        }
    }
}