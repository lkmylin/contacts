using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace WebApplication1.Services
{
    public interface IConfigurationService
    {
        string ConnectionString { get; }
    }
    public class ConfigurationService : IConfigurationService
    {
        public string ConnectionString => ConfigurationManager.AppSettings["ConnectionString"];
    }
}
