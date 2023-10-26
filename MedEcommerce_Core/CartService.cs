using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedEcommerce_DB;

namespace MedEcommerce_Core
{
    public class CartService : ICartService
    {
        private readonly List<Cart> _carts = new List<Cart>();

        public async Task<IEnumerable<Cart>> GetCartsAsync()
        {
            return await Task.FromResult(_carts);
        }

        public async Task<IEnumerable<Cart>> GetCartAsync(int userId)
        {
            return await Task.FromResult(_carts.Where(c => c.UserId == userId));
        }

        public async Task<Cart> UpdateCartAsync(int id, Cart cart)
        {
            var existingCart = _carts.FirstOrDefault(c => c.ID == id);
            if (existingCart != null)
            {
                existingCart.UserId = cart.UserId;
                // Update other properties as needed.
            }
            return await Task.FromResult(existingCart);
        }

        public async Task<Cart> CreateCartAsync(Cart cart)
        {
            cart.ID = _carts.Count + 1;
            _carts.Add(cart);
            return await Task.FromResult(cart);
        }

        public async Task<bool> DeleteCartAsync(int id)
        {
            var existingCart = _carts.FirstOrDefault(c => c.ID == id);
            if (existingCart != null)
            {
                _carts.Remove(existingCart);
                return await Task.FromResult(true);
            }
            return await Task.FromResult(false);
        }
    }
}
