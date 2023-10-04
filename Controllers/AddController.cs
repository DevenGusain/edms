using e_DMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace e_DMS.Controllers
{
    public class AddController : Controller
    {
        private readonly MyDbContext _dbcontext;

        public AddController(MyDbContext context)
        {
            _dbcontext = context;
        }

       public IActionResult AddLetterCategory()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ListCategory()
        {
            List<SelectListItem> cat_list = _dbcontext.LetterCategory.OrderBy(x=>x.orderNo).Select(x=> new SelectListItem { Text=x.category, Value=x.Id.ToString()}).ToList();
            return Json(cat_list);
        }



        [HttpPost]
        public JsonResult SubmitCategory(LetterCategory lt_category) 
        { 
            LetterCategory lt_cat = new LetterCategory();
            lt_cat = lt_category;

            _dbcontext.LetterCategory.Add(lt_cat);
            var result = _dbcontext.SaveChanges();
            return Json(result);
        
        }



        [HttpGet]
        public IActionResult ListEmployees()
        {
             List<SelectListItem> emp_list = _dbcontext.Employee.OrderBy(x=>x.Id).Select(x => new SelectListItem { Text=x.Name, Value=x.Id.ToString()}).ToList();
            return Json(emp_list);
        }


        [HttpGet]
        public IActionResult AddEmployee()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee emp)
        {
            
            _dbcontext.Employee.Add(emp);
            var response = _dbcontext.SaveChanges();
            return Json(response);

        }







    }
}
