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

        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<Tag>()
            .HasOne(s => s.Project)
            .WithMany(g => g.Tags)
            .HasForeignKey(s => s.ProjectId);

            modelBuilder.Entity<Project>().HasData(new Project
            {
                Id = 1,
                Name = "Project name 1",
                Note = "This is the first project"
            }, new Project
            {
                Id = 2,
                Name = "Project name 2",
                Note = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
            }, new Project
            {
                Id = 3,
                Name = "Project name 3",
                Note = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            }, new Project
            {
                Id = 4,
                Name = "Project name 4",
                Note = "sometimes by accident, sometimes on purpose (injected humour and the like)"
            });

            modelBuilder.Entity<Tag>().HasData(new Tag
            {
                Id = 1,
                Name = "design",
                ProjectId = 1
            }, new Tag
            {
                Id = 14,
                Name = "design2",
                ProjectId = 1
            }, new Tag
            {
                Id = 2,
                Name = "development",
                ProjectId = 3
            }, new Tag
            {
                Id = 3,
                Name = "management",
                ProjectId = 4
            });
        }
    }
}
