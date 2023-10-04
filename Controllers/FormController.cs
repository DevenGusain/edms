using e_DMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace e_DMS.Controllers
{
    public class FormController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MyDbContext _dbcontext;
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



        
        //public IActionResult MarkForm(string lt_no)
        //{
        //    Letter_Entry_Table lt_entry_details_load = new Letter_Entry_Table();
        //    lt_entry_details_load = _dbcontext.Letter_Entry_Table.Where(x=>x.letter_no == lt_no).FirstOrDefault();

        //    return Json(lt_entry_details_load);
        //}
        
        


    }
}
