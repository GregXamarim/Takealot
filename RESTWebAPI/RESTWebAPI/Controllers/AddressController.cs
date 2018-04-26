using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RESTWebAPI.Models;

namespace RESTWebAPI.Controllers
{
    public class AddressController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Address
        [AllowAnonymous]
        public IQueryable<Address> GetAddresses()
        {
            return db.Addresses;
        }

        
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetAddress")]
        [ResponseType(typeof(Address))]
        public IHttpActionResult GetAddress(int id)
        {
            var address = db.Addresses.Where(x => x.custID == id);
            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetAddresses")]
        [ResponseType(typeof(Address))]
        public IHttpActionResult GetAddresses(int id)
        {
            var list = db.customers.Join(
                db.Addresses, cust => cust.custID, ca => ca.custID,
                (cust, ca) => new
                {
                    AddressID = ca.AddressID,
                    custID = cust.custID,
                    RecipientName = ca.RecipientName,
                    ContactNum = ca.ContactNum,
                    AddressType = ca.AddressType,
                    StandNo = ca.StandNo,
                    StreetAddress = ca.StreetAddress,
                   Suburb = ca.Suburb,
                   City = ca.City,
                  PostalCode = ca.PostalCode


                });
            var cart = list.Where(c => c.custID.Equals(id));
            if (cart == null)
            {
                return (null);
            }
            return Ok(cart);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetAddressByID")]
        [ResponseType(typeof(Address))]
        public IHttpActionResult GetAddressByID(int id)
        {
            var list = db.customers.Join(
                db.Addresses, cust => cust.custID, ca => ca.custID,
                (cust, ca) => new
                {
                    AddressID = ca.AddressID,
                    custID = cust.custID,
                    RecipientName = ca.RecipientName,
                    ContactNum = ca.ContactNum,
                    AddressType = ca.AddressType,
                    StandNo = ca.StandNo,
                    StreetAddress = ca.StreetAddress,
                    Suburb = ca.Suburb,
                    City = ca.City,
                    PostalCode = ca.PostalCode


                });
            var cart = list.Where(c => c.custID.Equals(id));
            if (cart == null)
            {
                return (null);
            }
            return Ok(cart);
        }

        // PUT: api/Address/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAddress(int id, Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != address.AddressID)
            {
                return BadRequest();
            }

            db.Entry(address).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Address
        [AllowAnonymous]
        [ResponseType(typeof(Address))]
        public IHttpActionResult PostAddress(Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Addresses.Add(address);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = address.AddressID }, address);
        }

        // DELETE: api/Address/5
        [AllowAnonymous]
        [ResponseType(typeof(Address))]
        public IHttpActionResult DeleteAddress(int id)
        {
            Address address = db.Addresses.Find(id);
            if (address == null)
            {
                return NotFound();
            }

            db.Addresses.Remove(address);
            db.SaveChanges();

            return Ok(address);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AddressExists(int id)
        {
            return db.Addresses.Count(e => e.AddressID == id) > 0;
        }
    }
}