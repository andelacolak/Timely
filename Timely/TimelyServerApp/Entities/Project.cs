using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Viewmodels;

namespace TimelyServerApp.Entities
{
    public class Project
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        public string Note { get; set; }

        public ICollection<WorkSession> WorkSessions { get; set; }
    }
}
