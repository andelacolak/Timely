using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimelyServerApp.Viewmodels
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Note { get; set; }

        public bool Active { get; set; }
    }
}
