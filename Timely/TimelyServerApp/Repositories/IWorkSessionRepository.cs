using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyServerApp.Entities;

namespace TimelyServerApp.Repositories
{
    public interface IWorkSessionRepository : IRepository<WorkSession>
    {
        WorkSession GetActive(int projectId);
    }
}
