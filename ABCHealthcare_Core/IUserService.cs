using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ABCHealthcare_Core.DTO;
using ABCHealthcare_DB;

namespace ABCHealthcare_Core
{
    public interface IUserService
    {
        Task<AuthenticatedUser>SignUp(User user);
        Task<AuthenticatedUser> SignIn(User user);
    }
}
