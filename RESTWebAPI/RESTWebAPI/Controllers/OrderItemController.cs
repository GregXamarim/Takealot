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
    public class OrderItemController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/OrderItem
        [AllowAnonymous]
        public IQueryable<Object> GetOrderItems()
        {
            var orderItem = db.customers.
                 Join(db.OrderItems,
                 cust => cust.custID, oi => oi.custID,
                 (cust, oi) => new
                 {
                     OrderItemID = oi.OrderItemID,
                     OrderID = oi.OrderID,
                     ProductID = oi.ProductID,
                     custID = cust.custID,
                     CartQuantity = oi.CartQuantity


                 }).Join(db.Products,
                         a => a.ProductID, p => p.ProductID,
                         (a, p) => new
                         {
                             OrderItemID = a.OrderItemID,
                             OrderID = a.OrderID,
                             ProductID = p.ProductID,
                             custID = a.custID,
                             ProdName = p.ProdName,
                             Price = p.Price,
                             Quantity = p.Quantity,
                             CartQuantity = a.CartQuantity



                         });


            if (orderItem == null)
            {
                return (null);
            }

            return orderItem;
        }

        // GET: api/OrderItem/5
        [AllowAnonymous]
        [ResponseType(typeof(Object))]
        public IHttpActionResult GetOrderItem(int id)
        {
            var list = db.customers.
                 Join(db.OrderItems,
                 cust => cust.custID, oi => oi.custID,
                 (cust, oi) => new
                 {
                     OrderItemID = oi.OrderItemID,
                     OrderID = oi.OrderID,
                     ProductID = oi.ProductID,
                     custID = cust.custID,
                     CartQuantity = oi.CartQuantity
                     

                 }).Join(db.Products,
                         a => a.ProductID, p => p.ProductID,
                         (a, p) => new
                         {
                             OrderItemID = a.OrderItemID,
                             OrderID = a.OrderID,
                             ProductID = p.ProductID,
                             custID = a.custID,
                             ProdName = p.ProdName,
                             Price = p.Price,
                             CartQuantity = a.CartQuantity
                         });

            var orderItem = list.Where(c => c.OrderID.Equals(id));

            if (orderItem == null)
            {
                return (null);
            }

            return Ok(orderItem);
        }

        // PUT: api/OrderItem/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrderItem(int id, OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderItem.OrderItemID)
            {
                return BadRequest();
            }

            db.Entry(orderItem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(id))
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

        // POST: api/OrderItem
        [AllowAnonymous]
        [ResponseType(typeof(OrderItem))]
        public IHttpActionResult PostOrderItem(OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderItems.Add(orderItem);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = orderItem.OrderItemID }, orderItem);
        }

        // DELETE: api/OrderItem/5
        [AllowAnonymous]
        [ResponseType(typeof(OrderItem))]
        public IHttpActionResult DeleteOrderItem(int id)
        {
            OrderItem orderItem = db.OrderItems.Find(id);
            if (orderItem == null)
            {
                return NotFound();
            }

            db.OrderItems.Remove(orderItem);
            db.SaveChanges();

            return Ok(orderItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderItemExists(int id)
        {
            return db.OrderItems.Count(e => e.OrderItemID == id) > 0;
        }
    }
}