using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MedEcommerce_API.Controllers;
using MedEcommerce_DB;
using MedEcommerce_Core;
using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace ABC_Healthcare_Tests
{
    public class UsersControllerTests
    {
        [Fact]
        public async Task GetUsers_ReturnsOkResult()
        {
            // Arrange
            var mockUserService = new Mock<IUsersService>();
            mockUserService.Setup(s => s.GetUsersAsync())
                .ReturnsAsync(new List<User>
                {
                    new User { Id = 1, FirstName = "User1" },
                    new User { Id = 2, FirstName = "User2" }
                });

            var controller = new UsersController(mockUserService.Object);

            // Act
            var result = await controller.GetUsers();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var users = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Value);
            Assert.Equal(2, users.Count());


        }
        [Fact]
        public async Task GetUser_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var mockUserService = new Mock<IUsersService>();
            mockUserService.Setup(s => s.GetUserByIdAsync(1))
                .ReturnsAsync((User)null);

            var controller = new UsersController(mockUserService.Object);

            // Act
            var result = await controller.GetUser(1);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PutUser_ExistingUser_ReturnsOkResult()
        {
            // Arrange
            var mockUserService = new Mock<IUsersService>();
            var existingUser = new User { Id = 1, FirstName = "User1" };
            var updatedUser = new User { Id = 1, FirstName = "UpdatedUser" };
            mockUserService.Setup(s => s.UpdateUserAsync(1, updatedUser))
                .ReturnsAsync(updatedUser);

            var controller = new UsersController(mockUserService.Object);

            // Act
            var result = await controller.PutUser(1, updatedUser);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var user = Assert.IsType<User>(okResult.Value);
            Assert.Equal("UpdatedUser", user.FirstName);
        }

        [Fact]
        public async Task PostUser_ValidUser_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var mockUserService = new Mock<IUsersService>();
            var newUser = new User { FirstName = "NewUser" };
            mockUserService.Setup(s => s.CreateUserAsync(newUser))
                .ReturnsAsync(newUser);

            var controller = new UsersController(mockUserService.Object);

            // Act
            var result = await controller.PostUser(newUser);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var user = Assert.IsType<User>(createdAtActionResult.Value);
            Assert.Equal("NewUser", user.FirstName);
        }

        [Fact]
        public async Task DeleteUser_ExistingId_ReturnsNoContent()
        {
            // Arrange
            var mockUserService = new Mock<IUsersService>();
            mockUserService.Setup(s => s.DeleteUserAsync(1))
                .ReturnsAsync(true);

            var controller = new UsersController(mockUserService.Object);

            // Act
            var result = await controller.DeleteUser(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteUser_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var mockUserService = new Mock<IUsersService>();
            mockUserService.Setup(s => s.DeleteUserAsync(1))
                .ReturnsAsync(false);

            var controller = new UsersController(mockUserService.Object);

            // Act
            var result = await controller.DeleteUser(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
        // Add other test methods for remaining actions in UsersController
    }
}
