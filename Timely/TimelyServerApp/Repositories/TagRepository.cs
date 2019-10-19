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
            _timelyDBContext.SaveChanges();
        }

        public void Delete(Tag entity)
        {
            _timelyDBContext.Remove(entity);
            _timelyDBContext.SaveChanges();
        }

        public Tag Get(int id)
        {
            return _timelyDBContext.Tags.FirstOrDefault(x => x.Id == id);
        }

        public IQueryable<Tag> GetAll()
        {
            return _timelyDBContext.Tags;
        }

        public void Update(Tag dbEntity, Tag entity)
        {
            dbEntity.Name = entity.Name;

            _timelyDBContext.SaveChanges();
        }
    }
}
