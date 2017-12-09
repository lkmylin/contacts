using System;
using System.Collections.Generic;
using System.Web.Http;
using Ninject;
using System.Web.Http.Dependencies;
using WebApplication1.Services;
using WebApplication1.Data;

namespace WebApplication1
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.DependencyResolver = new DependencyResolver(new StandardKernel());
        }
    }

    public class DependencyResolver : IDependencyResolver
    {
        private readonly StandardKernel _kernel;
        public DependencyResolver(StandardKernel kernel)
        {
            _kernel = kernel;
            _kernel.Bind<IConfigurationService>().To<ConfigurationService>().InThreadScope();
            _kernel.Bind<IContactsRepository>().To<ContactsRepository>().InThreadScope();
            _kernel.Bind<ContactsDataContext>().ToMethod((context) => new ContactsDataContext(_kernel.Get<IConfigurationService>()));
        }

        public IDependencyScope BeginScope()
        {
            return new DependencyResolver(new StandardKernel());
        }

        public void Dispose()
        {
            _kernel.Dispose();
        }

        public object GetService(Type type)
        {
            return _kernel.TryGet(type);
        }

        public IEnumerable<object> GetServices(Type type)
        {
            return _kernel.GetAll(type);
        }
    }
}
