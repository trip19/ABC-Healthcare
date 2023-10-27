using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ABCHealthcare_DB;

namespace ABCHealthcare_Core
{
    public class UsersService : IUsersService
    {
        private readonly List<User> _users = new List<User>();

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await Task.FromResult(_users);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await Task.FromResult(_users.FirstOrDefault(u => u.Id == id));
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            var existingUser = _users.FirstOrDefault(u => u.Id == id);
            if (existingUser != null)
            {
                existingUser.FirstName = user.FirstName;
                // Update other properties as needed.
            }
            return await Task.FromResult(existingUser);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            user.Id = _users.Count + 1;
            _users.Add(user);
            return await Task.FromResult(user);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var existingUser = _users.FirstOrDefault(u => u.Id == id);
            if (existingUser != null)
            {
                _users.Remove(existingUser);
                return await Task.FromResult(true);
            }
            return await Task.FromResult(false);
        }
    }
}
