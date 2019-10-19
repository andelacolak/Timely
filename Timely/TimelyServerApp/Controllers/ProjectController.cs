using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Repositories;
using TimelyServerApp.Viewmodels;

namespace TimelyServerApp.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectController: Controller
    {
        private readonly IRepository<Entities.Project> _dataRepository;

        public ProjectController(IRepository<Entities.Project> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Project> projects = _dataRepository.GetAll()
                .Include(x => x.Tags)
                .Select(x => new Project
                {
                    Name = x.Name,
                    Note = x.Note,
                    TagNames = x.Tags.Select(y => y.Name)
                });
            return Ok(projects);
        }

        // GET: api/project/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            Entities.Project project = _dataRepository.Get(id);

            if (project == null)
                return NotFound("The Project record couldn't be found.");

            return Ok(project);
        }

        // POST: api/project
        [HttpPost]
        public IActionResult Post([FromBody] Entities.Project project)
        {
            if (project == null)
                return BadRequest("Project is null.");

            _dataRepository.Add(project);

            return CreatedAtRoute(
                  "Get",
                  new { project.Id },
                  project);
        }

        // PUT: api/project/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Entities.Project project)
        {
            if (project == null)
            {
                return BadRequest("Project is null.");
            }

            Entities.Project projectToUpdate = _dataRepository.Get(id);

            if (projectToUpdate == null)
                return NotFound("The Project record couldn't be found.");

            _dataRepository.Update(projectToUpdate, project);
            return Ok();
        }

        // DELETE: api/project/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Entities.Project project = _dataRepository.Get(id);

            if (project == null)
                return NotFound("The Employee record couldn't be found.");

            _dataRepository.Delete(project);

            return Ok();
        }
    }
}
