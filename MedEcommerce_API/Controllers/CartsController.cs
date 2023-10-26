using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedEcommerce_DB;
using MedEcommerce_Core;

namespace MedEcommerce_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartsController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            var carts = await _cartService.GetCartsAsync();
            if (carts == null)
            {
                return NotFound();
            }
            return Ok(carts);
        }

        // GET: api/Carts/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart(int userId)
        {
            var cart = await _cartService.GetCartAsync(userId);

            if (cart == null || !cart.Any())
            {
                return NotFound();
            }

            return Ok(cart);
        }

        // PUT: api/Carts/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Cart>> PutCart(int id, Cart cart)
        {
            if (id != cart.ID)
            {
                return BadRequest();
            }

            var updatedCart = await _cartService.UpdateCartAsync(id, cart);

            if (updatedCart == null)
            {
                return NotFound();
            }

            return Ok(updatedCart);
        }

        // POST: api/Carts
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            var createdCart = await _cartService.CreateCartAsync(cart);

            return CreatedAtAction("GetCart", new { userId = createdCart.UserId }, createdCart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var result = await _cartService.DeleteCartAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
