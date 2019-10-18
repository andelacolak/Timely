using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TimelyServerApp.Entities
{
    public class ProjectTag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectTagId { get; set; }

        public int ProjectId { get; set; }

        public int TagId { get; set; }

        public virtual Project Project { get; set; }

        public virtual Tag Tag { get; set; }
    }
}
