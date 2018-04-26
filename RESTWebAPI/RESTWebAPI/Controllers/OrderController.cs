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
    public class OrderController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Order
        [AllowAnonymous]
        public IQueryable<Object> GetOrders()
        {
            var list = db.customers.
                Join(db.Orders,
                cust => cust.custID, o => o.custID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    custID = cust.custID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    Status = o.Status

                });
            return list;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetOrder")]
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(int id)
        {
            var list = db.customers.
                Join(db.Orders,
                cust => cust.custID, o => o.custID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    custID = cust.custID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    Status = o.Status

                });

            var order = (from o in list orderby o.OrderID descending select o).FirstOrDefault();
            if (order == null)
            {
                return (null);
            }

            return Ok(order);

        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetOrders")]
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrders(int id)
        {
            var list = db.customers.
                Join(db.Orders,
                cust => cust.custID, o => o.custID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    custID = cust.custID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    Status = o.Status

                });

            var order = list.Where(x => x.OrderID == id);
            if (order == null)
            {
                return (null);
            }

            return Ok(order);

        }

        // PUT: api/Order/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Order
        [AllowAnonymous]
        [ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Orders.Add(order);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.OrderID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = order.OrderID }, order);
        }

        // DELETE: api/Order/5
        [AllowAnonymous]
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}