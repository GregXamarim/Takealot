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
using System.Web.Http.Cors;
using System.Security.Claims;

namespace RESTWebAPI.Controllers
{
    //[EnableCors: (origins: "http://localhost:4200/",headers: "*", methods: "*")]
    public class CustomerController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/customer
        public IQueryable<customer> Getcustomers()
        {
            return db.customers;
        }



        // PUT: api/customer/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcustomer(int id, customer customer)
        {
            

            if (id != customer.custID)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!customerExists(id))
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

        // POST: api/customer
        [AllowAnonymous]
        [ResponseType(typeof(customer))]
        public IHttpActionResult Postcustomer(customer customer)
        {
          

            db.customers.Add(customer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.custID }, customer);
        }

        [HttpGet]
        [Route("api/GetUserClaims")]
        public customer GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            customer model = new customer()
            {
                custID = Convert.ToInt32(identityClaims.FindFirst("custID").Value),
                FirstName = identityClaims.FindFirst("FirstName").Value,
                LastName = identityClaims.FindFirst("LastName").Value,
                Email = identityClaims.FindFirst("Email").Value,
                Password = identityClaims.FindFirst("Password").Value,
                Gender = identityClaims.FindFirst("Gender").Value,
                Birthday = identityClaims.FindFirst("Birthday").Value
            };
            return model;
        }

        // DELETE: api/customer/5
        [ResponseType(typeof(customer))]
        public IHttpActionResult Deletecustomer(int id)
        {
            customer customer = db.customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool customerExists(int id)
        {
            return db.customers.Count(e => e.custID == id) > 0;
        }
    }
}