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
    public class CartController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Cart
        [AllowAnonymous]
        public IQueryable<Object> GetCarts(int id)
        {
            var list = db.customers.Join(
                db.Carts, cust => cust.custID, ca => ca.custID,
                (cust, ca) => new
                {
                    CartID = ca.CartID,
                    ProductID = ca.ProductID,
                    custID = cust.custID,
                    CartQuantity = ca.CartQuantity


                }).Join(db.Products,
                a => a.ProductID, p => p.ProductID,
                (a, p) => new
                {
                    CartID = a.CartID,
                    ProductID = p.ProductID,
                    custID = a.custID,
                    ProdName = p.ProdName,
                    Price = p.Price,
                    CartQuantity = a.CartQuantity,
                    Quantity = p.Quantity,
                    ProdImage = p.ProdImage

                });
            var cart = list.Where(c => c.custID.Equals(id));
            if(cart == null)
            {
                return (null);
            }
            return cart;


        }

        // GET: api/Cart/5
        //[ResponseType(typeof(Cart))]
        //public IHttpActionResult GetCart(int id)
        //{
        //    Cart cart = db.Carts.Find(id);
        //    if (cart == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(cart);
        //}

        // PUT: api/Cart/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCart(int id, Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cart.CartID)
            {
                return BadRequest();
            }

            db.Entry(cart).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Cart
        [AllowAnonymous]
        [ResponseType(typeof(Cart))]
        public IHttpActionResult PostCart(Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Carts.Add(cart);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CartExists(cart.CartID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = cart.CartID }, cart);
        }

        // DELETE: api/Cart/5
        [AllowAnonymous]
        [ResponseType(typeof(Cart))]
        public IHttpActionResult DeleteCart(int id)
        {
            Cart cart = db.Carts.Find(id);
            if (cart == null)
            {
                return NotFound();
            }

            db.Carts.Remove(cart);
            db.SaveChanges();

            return Ok(cart);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CartExists(int id)
        {
            return db.Carts.Count(e => e.CartID == id) > 0;
        }
    }
}