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
        private readonly IRepository<Entities.Tag> _tagRepository;

        private readonly IRepository<Entities.WorkSessionTag> _workSessionTagRepository;

        public TagController(IRepository<Entities.Tag> tagRepository, IRepository<Entities.WorkSessionTag> workSessionTagRepository)
        {
            _tagRepository = tagRepository;
            _workSessionTagRepository = workSessionTagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Tag> tags = _tagRepository.GetAll()
                .Select(x => new Tag
                {
                    Id = x.Id,
                    Name = x.Name
                });
            return Ok(tags);
        }

        [HttpPost]
        public IActionResult Post(Tag tag, bool alreadyExists = false) 
        {
            //if (!alreadyExists) 
            //    _tagRepository.Add(new Entities.Tag { Id = tag.Id, Name = tag.Name });

            //_workSessionTagRepository.Add(
            //    new Entities.WorkSessionTag
            //    {
            //        TagId = tag.Id,

            //    });
            return Ok();
        }
    }
}