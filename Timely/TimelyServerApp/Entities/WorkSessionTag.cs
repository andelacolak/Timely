using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimelyServerApp.Entities
{
    public class WorkSessionTag
    {
        public int WorkSessionId { get; set; }

        public WorkSession WorkSession { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
