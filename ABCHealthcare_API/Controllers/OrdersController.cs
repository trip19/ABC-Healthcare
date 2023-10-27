using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ABCHealthcare_DB;
using ABCHealthcare_Core;

namespace ABCHealthcare_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _orderService.GetOrdersAsync();
            return Ok(orders);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder(int id)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(id);

            if (orders == null || orders.Count() == 0)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            var existingOrder = await _orderService.GetOrderByIdAsync(id);

            if (existingOrder == null)
            {
                return NotFound();
            }

            existingOrder.Status = order.Status;
            var updatedOrder = await _orderService.UpdateOrderAsync(existingOrder);

            return updatedOrder;
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (_orderService == null)
            {
                return Problem("Order service is null.");
            }

            var cartItems = await _orderService.GetCartItemsByUserIdAsync(order.UserId);

            foreach (var cartItem in cartItems)
            {
                OrderDetails details = new OrderDetails
                {
                    MedId = cartItem.MedId,
                    Quantity = cartItem.Quantity
                };

                order.Details.Add(details);
            }

            var createdOrder = await _orderService.CreateOrderAsync(order);

            return CreatedAtAction("GetOrder", new { id = createdOrder.Id }, createdOrder);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            await _orderService.DeleteOrderAsync(id);

            return NoContent();
        }

    }
}
