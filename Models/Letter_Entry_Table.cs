using System.ComponentModel.DataAnnotations;

namespace e_DMS.Models
{
    public class Letter_Entry_Table
    {      
        public string Id { get; set; }
        public string letter_no { get; set; }
        
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime dated { get; set; }
        public string subject { get; set; }
        public string letter_category { get; set; }
        public string letter_language { get; set; }
        public string letter_incoming_mode { get; set; }
        public string letter_remarks { get; set; }

    }
}
