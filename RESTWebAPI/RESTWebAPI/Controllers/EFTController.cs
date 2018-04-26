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
    public class EFTController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/EFT
        public IQueryable<EFT> GetEFTs()
        {
            return db.EFTs;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetEFT")]
        [ResponseType(typeof(EFT))]
        public IHttpActionResult GetEFT(int id)
        {
     
            var eFT = db.EFTs.FirstOrDefault(x => x.PaymentID == id);

            if (eFT == null)
            {
                return NotFound();
            }

            return Ok(eFT);
        }

        // PUT: api/EFT/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEFT(int id, EFT eFT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != eFT.AccountID)
            {
                return BadRequest();
            }

            db.Entry(eFT).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EFTExists(id))
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

        // POST: api/EFT
        [AllowAnonymous]
        [ResponseType(typeof(EFT))]
        public IHttpActionResult PostEFT(EFT eFT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EFTs.Add(eFT);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (EFTExists(eFT.AccountID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = eFT.AccountID }, eFT);
        }

        // DELETE: api/EFT/5
        [AllowAnonymous]
        [ResponseType(typeof(EFT))]
        public IHttpActionResult DeleteEFT(int id)
        {
            EFT eFT = db.EFTs.Find(id);
            if (eFT == null)
            {
                return NotFound();
            }

            db.EFTs.Remove(eFT);
            db.SaveChanges();

            return Ok(eFT);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EFTExists(int id)
        {
            return db.EFTs.Count(e => e.AccountID == id) > 0;
        }
    }
}