using System.Collections.Generic;
using System.Threading.Tasks;
using ABCHealthcare_DB;


namespace ABCHealthcare_Core
{
    public interface ICartService
    {
        Task<IEnumerable<Cart>> GetCartsAsync();
        Task<IEnumerable<Cart>> GetCartAsync(int userId);
        Task<Cart> UpdateCartAsync(int id, Cart cart);
        Task<Cart> CreateCartAsync(Cart cart);
        Task<bool> DeleteCartAsync(int id);
    }
}
