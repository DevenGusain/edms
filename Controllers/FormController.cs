using e_DMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;

namespace e_DMS.Controllers
{
    public class FormController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MyDbContext _dbcontext;
        public static string _filename;
        public FormController(ILogger<HomeController> logger, MyDbContext dbcontext)
        {
            _logger = logger;
            _dbcontext = dbcontext;
        }
        public IActionResult EntryForm()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ListCategory()
        {
            List<SelectListItem> cat_list = _dbcontext.LetterCategory.OrderBy(x => x.orderNo).Select(x => new SelectListItem { Text = x.category, Value = x.Id.ToString() }).ToList();
            return Json(cat_list);
        }

        [HttpPost]
        public IActionResult EntryForm(Letter_Entry_Table lt_entry)
        {
            Letter_Entry_Table new_letter_entry = lt_entry;
            _dbcontext.Letter_Entry_Table.Add(new_letter_entry);
            var submit = _dbcontext.SaveChanges();
            return Json(submit);
        }

       

        public IActionResult EditEntry()
        { 
            return View(); 
        
        }

        public IActionResult LetterNo()
        {
            var letter_no = _dbcontext.Letter_Entry_Table.Select(x => new SelectListItem { Text=x.letter_no, Value= x.Id }).ToList();
            return Json(letter_no);
        }

        public IActionResult LoadDetails(string letter_no)
        {
            Letter_Entry_Table lt_ent_table = new Letter_Entry_Table();
            lt_ent_table = _dbcontext.Letter_Entry_Table.Where(x=>x.letter_no.Equals(letter_no)).FirstOrDefault();

            return Json(lt_ent_table);
        }

        [HttpPost]
        public IActionResult EditEntry(Letter_Entry_Table lt_ent_table)
        {
            Letter_Entry_Table update_lt_entry = new Letter_Entry_Table();
            update_lt_entry = lt_ent_table;
            _dbcontext.Letter_Entry_Table.Update(update_lt_entry);
            var update = _dbcontext.SaveChanges();

            return Json(update);
        }

        [HttpGet]
        public IActionResult MarkForm()
        {
            return View();
        }


        [HttpGet]
        public IActionResult load_employee()
        {
            List<SelectListItem> employee_list = new List<SelectListItem>();
            employee_list = _dbcontext.Employee.Select(x=>new SelectListItem { Text=x.Name, Value= Convert.ToString(x.Id)}).ToList();

            return Json(employee_list);
        }



        //Upload file on server

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<bool>  Upload_pdf([FromForm] IFormFile cfile)
        {
            string path = "";
            bool iscopied = false;

            try
            {
                if (cfile.Length > 0)
                {
                    string filename = Guid.NewGuid() + Path.GetExtension(cfile.FileName);
                    _filename =filename;
                    path = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "Upload"));

                    using (var filestream = new FileStream(Path.Combine(path, filename), FileMode.Create))
                    {
                        await cfile.CopyToAsync(filestream);
                    }
                    iscopied = true;
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return iscopied;
        }


        [HttpPost]
        public IActionResult MarkForm(Letter_Marked lt_mark_query)
        {
            Letter_Marked lt_marked = new Letter_Marked();
            Letter_Entry_Table letter_entry_removed = new Letter_Entry_Table() { Id = lt_mark_query.letter_id};

            lt_marked = lt_mark_query;
            lt_marked.file_upload = _filename;

            _filename = "";

            var insert_result = _dbcontext.Letter_Marked.Add(lt_marked);
            var delete_result = _dbcontext.Letter_Entry_Table.Remove(letter_entry_removed);

            var final_result = _dbcontext.SaveChanges();

            return Json(final_result);
        }












    }
}
