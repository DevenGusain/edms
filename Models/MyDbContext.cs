using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace e_DMS.Models

{
    public class MyDbContext : DbContext
    {
        
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
       
        public DbSet <LetterCategory> LetterCategory { get; set; }
       
        public DbSet<users> users { get; set; }

        public DbSet<Letter_Entry_Table> Letter_Entry_Table { get; set; }
        
    }
}
