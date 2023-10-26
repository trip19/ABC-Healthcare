using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MedEcommerce_DB;


namespace MedEcommerce_Core
{
    public interface IUsersService
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> UpdateUserAsync(int id, User user);
        Task<User> CreateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
    }
}
