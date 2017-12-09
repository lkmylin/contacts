using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Data;
using WebApplication1.Entities;

namespace WebApplication1.Controllers
{
    [RoutePrefix("contacts")]
    public class ContactsController : ApiController
    {
        private readonly IContactsRepository _repo;

        public ContactsController(IContactsRepository contactsRepository)
        {
            _repo = contactsRepository;
        }

        [Route("")]
        public IHttpActionResult Get()
        {
            return Json(_repo.Get());
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            return Json(_repo.Get(id));
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody]Contact contact)
        {
            return Json(_repo.Update(contact));
        }

        // PUT api/<controller>/5
        public IHttpActionResult Put([FromBody]Contact contact)
        {
            return Json(_repo.Create(contact));
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete([FromBody]Contact contact)
        {
            return Json(_repo.Delete(contact));
        }
    }
}