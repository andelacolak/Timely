using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimelyServerApp.Viewmodels
{
    public class WorkSession
    {
        public int Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Description { get; set; }

        public Project Project { get; set; }

        public IEnumerable<string> Tags { get; set; }
    }
}
