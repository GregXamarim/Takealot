using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security.OAuth;
using RESTWebAPI.Models;

namespace RESTWebAPI
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var db = new DBModel();
            var customer = db.customers.FirstOrDefault(x => x.Email == context.UserName && x.Password == context.Password);
            var admin = db.Admins.FirstOrDefault(x => x.Email == context.UserName && x.Password == context.Password);
           var driver = db.Drivers.FirstOrDefault(x => x.Email == context.UserName && x.Password == context.Password);
            var supplier = db.Suppliers.FirstOrDefault(x => x.Email == context.UserName && x.Password == context.Password);

            if (customer != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("custID", customer.custID.ToString()));
                identity.AddClaim(new Claim("FirstName",customer.FirstName));
                identity.AddClaim(new Claim("LastName", customer.LastName));
                identity.AddClaim(new Claim("Email", customer.Email));
                identity.AddClaim(new Claim("Password", customer.Password));
                identity.AddClaim(new Claim("Gender", customer.Gender));
                identity.AddClaim(new Claim("Birthday", customer.Birthday));
                context.Validated(identity);
            }
            else if(admin != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("AdminID", admin.AdminID.ToString()));
                identity.AddClaim(new Claim("FirstName", admin.FirstName));
                identity.AddClaim(new Claim("LastName", admin.LastName));
                identity.AddClaim(new Claim("Email", admin.Email));
                identity.AddClaim(new Claim("Password", admin.Password));
                context.Validated(identity);
            }
            else if (driver != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("DriverID", driver.DriverID.ToString()));
                identity.AddClaim(new Claim("FirstName", driver.FirstName));
                identity.AddClaim(new Claim("LastName", driver.LastName));
                identity.AddClaim(new Claim("Email", driver.Email));
                identity.AddClaim(new Claim("Password", driver.Password));
                context.Validated(identity);
            }
            else if (supplier != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("SupplierID", supplier.SupplierID.ToString()));
                identity.AddClaim(new Claim("SupplierName", supplier.SupplierName));
                identity.AddClaim(new Claim("Email", supplier.Email));
                identity.AddClaim(new Claim("Password", supplier.Password));
                context.Validated(identity);
            }

            else
            {
                return;
            }
        }
    }
}