using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Entities;

namespace TimelyServerApp.Repositories
{
    public class WorkSessionRepository : IRepository<WorkSession>
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
            throw new NotImplementedException();
        }

        public WorkSession Get(int id)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}
