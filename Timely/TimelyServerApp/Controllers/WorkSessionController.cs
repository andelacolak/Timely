using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimelyServerApp.Repositories;
using TimelyServerApp.Viewmodels;

namespace TimelyServerApp.Controllers
{
    [Route("api/worksessions")]
    [ApiController]
    public class WorkSessionController : ControllerBase
    {
        private readonly IRepository<Entities.WorkSession> _dataRepository;

        public WorkSessionController(IRepository<Entities.WorkSession> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IEnumerable<WorkSession> Get()
        {
            return _dataRepository.GetAll()
                .Select(x => new WorkSession 
                {
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    Description = x.Description,
                    Project = new Project 
                    { 
                        Name = x.Project.Name,
                        Note = x.Project.Note
                    },
                    Tags = x.WorkSessionTags.Select(y => y.Tag.Name)
                })
                .ToList();
        }
    }
}