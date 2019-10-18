using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Entities;

namespace TimelyServerApp
{
    public class TimelyDBContext : DbContext
    {
        public TimelyDBContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }

        public DbSet<ProjectTag> ProjectTags { get; set; }

        public DbSet<Tag> Tags { get; set; }
    }
}
