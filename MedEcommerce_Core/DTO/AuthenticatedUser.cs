﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedEcommerce_Core.DTO
{
    public class AuthenticatedUser
    {
        public string Token { get; set; }
        public string Useremail { get; set; }

        public string Role { get; set; }

        public int Id { get; set; }
    }
}
