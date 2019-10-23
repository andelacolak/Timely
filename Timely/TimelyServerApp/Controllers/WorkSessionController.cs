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
        private readonly IWorkSessionRepository _dataRepository;

        public WorkSessionController(IWorkSessionRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var workSessions = _dataRepository.GetAll()
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

            return Ok(workSessions);
        }

        [HttpGet]
        [Route("getactive/{id}")]
        public IActionResult GetActive(int id)
        {
            var workSession = _dataRepository.GetActive(id);

            if (workSession == null)
                return BadRequest("work session not found.");

            return Ok( new WorkSession
            {
                Id = workSession.Id,
                StartDate = workSession.StartDate
            });
        }

        [HttpPost]
        [Route("post")]
        public IActionResult Post([FromBody] Entities.WorkSession workSession)
        {
            if (workSession == null)
                return BadRequest("work session is null.");

            _dataRepository.Add(workSession);

            return CreatedAtRoute(
                  "Get",
                  new { workSession.Id },
                  workSession);
        }

        [HttpPost]
        [Route("update/{id}")]
        public IActionResult Update(int id, [FromBody] Entities.WorkSession workSession)
        {
            if (workSession == null)
                return BadRequest("work session is null.");

            var oldWorkSession = _dataRepository.Get(workSession.Id);

            _dataRepository.Update(oldWorkSession, workSession);

            return CreatedAtRoute(
                  "Get",
                  new { workSession.Id },
                  workSession);
        }

    }
}