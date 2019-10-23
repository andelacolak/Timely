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
    [Route("api/tags")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly IRepository<Entities.Tag> _dataRepository;

        public TagController(IRepository<Entities.Tag> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Tag> tags = _dataRepository.GetAll()
                .Select(x => new Tag
                {
                    Id = x.Id,
                    Name = x.Name
                });
            return Ok(tags);
        }
    }
}