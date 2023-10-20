using e_DMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace e_DMS.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MyDbContext _dbcontext;
        public HomeController(ILogger<HomeController> logger, MyDbContext dbcontext)
        {
            _logger = logger;
            _dbcontext = dbcontext;
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Index()
        {
            Letter_Entry_Table letter_Entry_Table = new Letter_Entry_Table();
            Letter_Marked letter_marked = new Letter_Marked();

            int entry_count = _dbcontext.Letter_Entry_Table.Select(x => x.Id).Count() + _dbcontext.Letter_Marked.Select(x => x.Id).Count();
            int marked_count = _dbcontext.Letter_Marked.Select(x => x.Id).Count();
            int marked_percent;
            marked_percent =   (marked_count * 100 / entry_count) ;

            ViewBag.entry_count = entry_count;
            ViewBag.marked_count = marked_count;
            ViewBag.marked_percent = marked_percent;
            
            return View();
        }



        [HttpGet]
        public IActionResult Dashboard()
        {
            return View();
        }

       

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}