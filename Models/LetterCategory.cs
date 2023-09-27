using System.ComponentModel.DataAnnotations;

namespace e_DMS.Models
{
    public class LetterCategory
    {
        [Key]
        public int Id { get; set; }
        public string category { get; set; }

        public int orderNo { get; set; }
    }
}
