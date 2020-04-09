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
    public class VideosController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;

        public Video Video { get; set; }

        public VideosController(ApplicationDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        public async Task<IActionResult> Index()
        {
            ListVideoModel listVideo = new ListVideoModel();
            listVideo.allVideos = await _db.Videos.ToListAsync();
            return View(listVideo);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(UploadFileModel model)
        {
            var name = model.changedname;
            var description = model.description;
            var files = model.files;
            string filename;
            string path;

            filename = ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');
            filename = this.EnsureCorrectFilename(filename);
            var uniqGuid = Guid.NewGuid().ToString();
            filename = uniqGuid + filename;
            path = this.GetPathAndFilename(filename);
            using (FileStream output = System.IO.File.Create(path))
                await files.CopyToAsync(output);

            // DB insert

            Video = new Video();
            if (ModelState.IsValid)
            {
                Video.Name = name;
                Video.Description = description;
                Video.Url = "/UploadedContent/uploadedVideos/" + filename;
                Video.Views = 0;
                _db.Videos.Add(Video);
                _db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        public void ViewCount(string idS)
        {
            int? id = Convert.ToInt32(idS);
            if (id != null)
            {
                var video = _db.Videos.First(v => v.Id == id);
                video.Views += 1;
                _db.SaveChanges();
            }
        }

        public void DeleteVideo(string idS)
        {
            int? id = Convert.ToInt32(idS);
            if (id != null)
            {
                var video = _db.Videos.First(v => v.Id == id);
                _db.Videos.Remove(video);
                _db.SaveChanges();
            }
        }

        public void EditVideo(string idS, string description, string name)
        {
            int? id = Convert.ToInt32(idS);
            if (id != null)
            {
                var video = _db.Videos.First(v => v.Id == id);
                video.Description = description;
                video.Name = name;
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
            return _env.WebRootPath + "\\UploadedContent\\uploadedVideos\\" + filename;
        }
    }
}