using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimelyServerApp.Viewmodels
{
    public class ProjectModel
    {
        public string Name { get; set; }

        public string Note { get; set; }

        public IEnumerable<TagModel> Tags { get; set; }
    }
}
