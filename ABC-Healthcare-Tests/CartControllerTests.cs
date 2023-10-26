using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using MedEcommerce_API.Controllers;
using MedEcommerce_Core;
using MedEcommerce_DB;

namespace ABC_Healthcare_Tests
{
    public class CartControllerTests
    {
        [Fact]
        public async Task GetCarts_ReturnsOkResult()
        {
            // Arrange
            var mockCartService = new Mock<ICartService>();
            mockCartService.Setup(s => s.GetCartsAsync())
                .ReturnsAsync(new List<Cart>
                {
                    new Cart { ID = 1, UserId = 1 },
                    new Cart { ID = 2, UserId = 1 }
                });

            var controller = new CartsController(mockCartService.Object);

            // Act
            var result = await controller.GetCarts();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var carts = Assert.IsAssignableFrom<IEnumerable<Cart>>(okResult.Value);
            Assert.Equal(2, carts.Count());
        }

        [Fact]
        public async Task GetCart_ExistingUserId_ReturnsOkResult()
        {
            // Arrange
            var mockCartService = new Mock<ICartService>();
            var userId = 1;
            mockCartService.Setup(s => s.GetCartAsync(userId))
                .ReturnsAsync(new List<Cart>
                {
                    new Cart { ID = 1, UserId = userId },
                    new Cart { ID = 2, UserId = userId }
                });

            var controller = new CartsController(mockCartService.Object);

            // Act
            var result = await controller.GetCart(userId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var carts = Assert.IsAssignableFrom<IEnumerable<Cart>>(okResult.Value);
            Assert.Equal(2, carts.Count());
        }

        [Fact]
        public async Task GetCart_NonExistingUserId_ReturnsNotFound()
        {
            // Arrange
            var mockCartService = new Mock<ICartService>();
            var userId = 1;
            mockCartService.Setup(s => s.GetCartAsync(userId))
                .ReturnsAsync(new List<Cart>());

            var controller = new CartsController(mockCartService.Object);

            // Act
            var result = await controller.GetCart(userId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }


        [Fact]
        public async Task PostCart_ValidCart_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var mockCartService = new Mock<ICartService>();
            var newCart = new Cart { UserId = 1 };
            mockCartService.Setup(s => s.CreateCartAsync(newCart))
                .ReturnsAsync(newCart);

            var controller = new CartsController(mockCartService.Object);

            // Act
            var result = await controller.PostCart(newCart);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var cart = Assert.IsType<Cart>(createdAtActionResult.Value);
            Assert.Equal(newCart.ID, cart.ID);
        }

        [Fact]
        public async Task DeleteCart_ExistingId_ReturnsNoContent()
        {
            // Arrange
            var mockCartService = new Mock<ICartService>();
            var cartId = 1;
            mockCartService.Setup(s => s.DeleteCartAsync(cartId))
                .ReturnsAsync(true);

            var controller = new CartsController(mockCartService.Object);

            // Act
            var result = await controller.DeleteCart(cartId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteCart_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var mockCartService = new Mock<ICartService>();
            var cartId = 1;
            mockCartService.Setup(s => s.DeleteCartAsync(cartId))
                .ReturnsAsync(false);

            var controller = new CartsController(mockCartService.Object);

            // Act
            var result = await controller.DeleteCart(cartId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
