using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Entities;

namespace TimelyServerApp.Repositories
{
    public class WorkSessionRepository : IWorkSessionRepository
    {
        private readonly TimelyDBContext _timelyDBContext;

        public WorkSessionRepository(TimelyDBContext timelyDBContext)
        {
            _timelyDBContext = timelyDBContext;
        }

        public void Add(WorkSession entity)
        {
            _timelyDBContext.Add(entity);
            _timelyDBContext.SaveChanges();
        }

        public void Delete(WorkSession entity)
        {
            _timelyDBContext.Remove(entity);
            _timelyDBContext.SaveChanges();
        }

        public WorkSession Get(int id)
        {
            return _timelyDBContext.WorkSessions
                .FirstOrDefault(x => x.Id == id);
        }

        public WorkSession GetActive(int projectId)
        {
            return _timelyDBContext.WorkSessions
                .FirstOrDefault(x => x.ProjectId == projectId && x.EndDate == null);
        }

        public IQueryable<WorkSession> GetAll()
        {
            return _timelyDBContext.WorkSessions
                .Include(x => x.Project)
                .Include(x => x.WorkSessionTags)
                    .ThenInclude(x => x.Tag);
        }

        public void Update(WorkSession dbEntity, WorkSession entity)
        {
            dbEntity.EndDate = entity.EndDate;
            dbEntity.Description = entity.Description;

            _timelyDBContext.SaveChanges();
        }
    }
}
