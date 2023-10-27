using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ABCHealthcare_DB;


namespace ABCHealthcare_Core
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
