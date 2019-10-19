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

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<ProjectTag>()
                .HasKey(x => new { x.ProjectId, x.TagId });

            modelBuilder.Entity<ProjectTag>()
                .HasOne(x => x.Project)
                .WithMany(y => y.ProjectTags)
                .HasForeignKey(y => y.ProjectId);

            modelBuilder.Entity<ProjectTag>()
                .HasOne(x => x.Tag)
                .WithMany(y => y.ProjectTags)
                .HasForeignKey(y => y.TagId);

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
                Name = "design"
            }, new Tag
            {
                Id = 2,
                Name = "development"
            }, new Tag
            {
                Id = 3,
                Name = "management"
            });

            modelBuilder.Entity<ProjectTag>().HasData(new ProjectTag 
            { 
                ProjectTagId = 1,
                ProjectId = 1,
                TagId = 1
            }, new ProjectTag
            {
                ProjectTagId = 2,
                ProjectId = 1,
                TagId = 2
            }, new ProjectTag
            {
                ProjectTagId = 3,
                ProjectId = 2,
                TagId = 3
            }, new ProjectTag
            {
                ProjectTagId = 4,
                ProjectId = 4,
                TagId = 3
            }, new ProjectTag
            {
                ProjectTagId = 5,
                ProjectId = 4,
                TagId = 1
            });
        }
    }
}
