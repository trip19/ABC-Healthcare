using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ABCHealthcare_DB
{
    public class Order
    {
        public Order()
        {
            Details = new List<OrderDetails>();
        }
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public decimal TotalAmount { get; set; }
        public int TotalItems { get; set; }
        public string? Status { get; set; }

        public List<OrderDetails>? Details { get; set; }

    }
}
