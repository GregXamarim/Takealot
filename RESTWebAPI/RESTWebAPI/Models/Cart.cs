//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RESTWebAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Cart
    {
        public int CartID { get; set; }
        public int ProductID { get; set; }
        public int custID { get; set; }
        public int CartQuantity { get; set; }
    
        public virtual customer customer { get; set; }
        public virtual Product Product { get; set; }
    }
}
