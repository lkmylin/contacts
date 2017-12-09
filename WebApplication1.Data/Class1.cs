using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Entities;
using System.Data.Entity;
using WebApplication1.Services;

namespace WebApplication1.Data
{
    public interface IContactsRepository
    {
        IEnumerable<Contact> Get();
        Contact Get(int ID_Contact);
        Contact Create(Contact contact);
        Contact Update(Contact contact);
        Contact Delete(Contact contact);
    }
    public class ContactsRepository : IContactsRepository
    {
        private readonly ContactsDataContext _db;

        public ContactsRepository(ContactsDataContext contactsDataContext)
        {
            _db = contactsDataContext;
        }

        public Contact Create(Contact contact)
        {
            return _db.Contacts.Add(contact);
        }

        public Contact Delete(Contact contact)
        {
            return _db.Contacts.Remove(contact);
        }

        public IEnumerable<Contact> Get()
        {
            return _db.Contacts;
        }

        public Contact Get(int ID_Contact)
        {
            return _db.Contacts.FirstOrDefault(x => x.ID_Contact == ID_Contact);
        }

        public Contact Update(Contact contact)
        {
            var contactDB = Get(contact.ID_Contact);
            if(contactDB != null)
            {
                contactDB.Email = contact.Email;
                contactDB.FirstName = contact.FirstName;
                contactDB.LastName = contact.LastName;
                contactDB.Phone = contact.Phone;
                _db.SaveChanges();
            }
            return contact;
        }
    }

    public class ContactsDataContext : DbContext
    {
        public ContactsDataContext(IConfigurationService configurationService) : base(configurationService.ConnectionString)
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; }
    }
}
