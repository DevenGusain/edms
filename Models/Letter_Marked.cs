using System.ComponentModel.DataAnnotations;

namespace e_DMS.Models
{
    public class Letter_Marked
    {
       [Key]
        public int Id { get; set; }
        public string letter_id { get; set; }
        public DateTime dated { get; set; }
        public string subject { get; set; }
        public string letter_category { get; set; }
        public string letter_language { get; set; }
        public string letter_incoming_mode { get; set; }
        public string letter_remarks { get; set; }
        public string marked_to { get; set; }
        public string file_upload { get; set; }

        public DateTime created_on { get; set; }
    }
}
