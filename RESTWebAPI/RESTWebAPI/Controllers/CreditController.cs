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
    public class CreditController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Credit
        public IQueryable<Credit> GetCredits()
        {
            return db.Credits;
        }

        // GET: api/Credit/5
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetCredit")]
        [ResponseType(typeof(Credit))]
        public IHttpActionResult GetCredit(int id)
        {
            var credit = db.Credits.FirstOrDefault(x => x.PaymentID == id);

            if (credit == null)
            {
                return NotFound();
            }

            return Ok(credit);
        }

        // PUT: api/Credit/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCredit(int id, Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != credit.CardID)
            {
                return BadRequest();
            }

            db.Entry(credit).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreditExists(id))
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

        // POST: api/Credit
        [AllowAnonymous]
        [ResponseType(typeof(Credit))]
        public IHttpActionResult PostCredit(Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Credits.Add(credit);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CreditExists(credit.CardID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = credit.CardID }, credit);
        }

        // DELETE: api/Credit/5
        [ResponseType(typeof(Credit))]
        public IHttpActionResult DeleteCredit(int id)
        {
            Credit credit = db.Credits.Find(id);
            if (credit == null)
            {
                return NotFound();
            }

            db.Credits.Remove(credit);
            db.SaveChanges();

            return Ok(credit);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CreditExists(int id)
        {
            return db.Credits.Count(e => e.CardID == id) > 0;
        }
    }
}