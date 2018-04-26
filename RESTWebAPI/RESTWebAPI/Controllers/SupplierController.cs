using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using RESTWebAPI.Models;

namespace RESTWebAPI.Controllers
{
    public class SupplierController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Supplier
        [AllowAnonymous]
        public IQueryable<Supplier> GetSuppliers()
        {
            return db.Suppliers;
        }
        [HttpGet]
        [Route("api/GetSupplierClaims")]
        public Supplier GetSupplierClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            Supplier SupplierModel = new Supplier()
            {
                SupplierID = Convert.ToInt32(identityClaims.FindFirst("SupplierID").Value),
                SupplierName = identityClaims.FindFirst("SupplierName").Value,
                Email = identityClaims.FindFirst("Email").Value,
                Password = identityClaims.FindFirst("Password").Value,

            };
            return SupplierModel;
        }

        // GET: api/Supplier/5
        //[ResponseType(typeof(Supplier))]
        //public IHttpActionResult GetSupplier(int id)
        //{
        //    Supplier supplier = db.Suppliers.Find(id);
        //    if (supplier == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(supplier);
        //}

        // PUT: api/Supplier/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSupplier(int id, Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplier.SupplierID)
            {
                return BadRequest();
            }

            db.Entry(supplier).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
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

        // POST: api/Supplier
        [AllowAnonymous]
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult PostSupplier(Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Suppliers.Add(supplier);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (SupplierExists(supplier.SupplierID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = supplier.SupplierID }, supplier);
        }

        // DELETE: api/Supplier/5
        [AllowAnonymous]
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult DeleteSupplier(int id)
        {
            Supplier supplier = db.Suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            db.Suppliers.Remove(supplier);
            db.SaveChanges();

            return Ok(supplier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SupplierExists(int id)
        {
            return db.Suppliers.Count(e => e.SupplierID == id) > 0;
        }
    }
}