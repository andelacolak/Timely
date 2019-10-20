using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Entities;

namespace TimelyServerApp.Repositories
{
    public class ProjectRepository : IRepository<Project>
    {
        private readonly TimelyDBContext _timelyDBContext;

        public ProjectRepository(TimelyDBContext timelyDBContext)
        {
            _timelyDBContext = timelyDBContext;
        }
        
        public void Add(Project entity)
        {
            _timelyDBContext.Add(entity);
            _timelyDBContext.SaveChanges();
        }

        public void Delete(Project entity)
        {
            _timelyDBContext.Remove(entity);
            _timelyDBContext.SaveChanges();
        }

        public Project Get(int id)
        {
            return _timelyDBContext.Projects.FirstOrDefault(x => x.Id == id);
        }

        public IQueryable<Project> GetAll()
        {
            return _timelyDBContext.Projects;
        }

        public void Update(Project dbEntity, Project entity)
        {
            dbEntity.Name = entity.Name;
            dbEntity.Note = entity.Note;

            _timelyDBContext.SaveChanges();
        }
    }
}
