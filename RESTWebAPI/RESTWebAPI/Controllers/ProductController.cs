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
    public class ProductController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Product
        [AllowAnonymous]
        public IQueryable<Product> GetProducts()
        {
            return db.Products;
        }

        // GET: api/Product/5
        [AllowAnonymous]

        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {

            var product = db.Products.FirstOrDefault(x => x.ProductID == id);
            if (product == null)
            {
                return (null);
            }
            return Ok(product);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetProduct")]
        [ResponseType(typeof(Product))]
         public IQueryable<Object> GetProductByID(int id)
        {
            var product = db.Products.Where(c => c.ProductID.Equals(id)).Select(x => new {
                x.ProductID,
                x.ProdName,
                x.Quantity,
                x.minQuantity,
                x.Price,
                x.ProdImage,
                x.Category

            });


            if (product == null)
            {
                return (null);
            }
            return product;


        }

    

        // PUT: api/Product/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductID)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Product
        [AllowAnonymous]
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(product);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ProductExists(product.ProductID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = product.ProductID }, product);
        }

        // DELETE: api/Product/5
        [AllowAnonymous]
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductID == id) > 0;
        }
    }
}