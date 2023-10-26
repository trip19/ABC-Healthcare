using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MedEcommerce_DB;

namespace MedEcommerce_Core
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId);
        Task<Order> GetOrderByIdAsync(int orderId);
        Task<Order> UpdateOrderAsync(Order order);
        Task<IEnumerable<Cart>> GetCartItemsByUserIdAsync(int userId);
        Task<Order> CreateOrderAsync(Order order);
        Task DeleteOrderAsync(int orderId);
    }
}
