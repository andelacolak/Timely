using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Entities;

namespace TimelyServerApp.Repositories
{
    public class TagRepository : IRepository<Tag>
    {
        private readonly TimelyDBContext _timelyDBContext;

        public TagRepository(TimelyDBContext timelyDBContext)
        {
            _timelyDBContext = timelyDBContext;
        }

        public void Add(Tag entity)
        {
            _timelyDBContext.Add(entity);
        }

        public void Delete(Tag entity)
        {
            throw new NotImplementedException();
        }

        public Tag Get(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Tag> GetAll()
        {
            return _timelyDBContext.Tags;
        }

        public void Update(Tag dbEntity, Tag entity)
        {
            throw new NotImplementedException();
        }
    }
}
