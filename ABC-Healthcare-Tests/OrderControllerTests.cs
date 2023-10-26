using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MedEcommerce_API.Controllers;
using MedEcommerce_Core;
using MedEcommerce_DB;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace ABC_Healthcare_Tests
{
    public class OrderControllerTests
    {
        [Fact]
        public async Task GetOrders_ReturnsOkResult()
        {
            // Arrange
            var mockOrderService = new Mock<IOrderService>();
            mockOrderService.Setup(s => s.GetOrdersAsync())
                .ReturnsAsync(new List<Order>
                {
                    new Order { Id = 1, UserId = 1, Status = "Pending" },
                    new Order { Id = 2, UserId = 2, Status = "Completed" }
                });

            var controller = new OrdersController(mockOrderService.Object);

            // Act
            var result = await controller.GetOrders();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var orders = Assert.IsAssignableFrom<IEnumerable<Order>>(okResult.Value);
            var orderList = orders.ToList(); // Convert the IEnumerable to a List
            Assert.Equal(2, orderList.Count);
        }

        [Fact]
        public async Task GetOrder_ExistingUserId_ReturnsOkResult()
        {
            // Arrange
            var mockOrderService = new Mock<IOrderService>();
            var userId = 1;
            mockOrderService.Setup(s => s.GetOrdersByUserIdAsync(userId))
                .ReturnsAsync(new List<Order>
                {
            new Order { Id = 1, UserId = userId, Status = "Pending" },
            new Order { Id = 2, UserId = userId, Status = "Completed" }
                });

            var controller = new OrdersController(mockOrderService.Object);

            // Act
            var result = await controller.GetOrder(userId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var orders = Assert.IsAssignableFrom<IEnumerable<Order>>(okResult.Value);
            var orderList = orders.ToList(); // Convert the IEnumerable to a List
            Assert.Equal(2, orderList.Count);
        }


        [Fact]
        public async Task GetOrder_NonExistingUserId_ReturnsNotFound()
        {
            // Arrange
            var mockOrderService = new Mock<IOrderService>();
            var userId = 3;
            mockOrderService.Setup(s => s.GetOrdersByUserIdAsync(userId))
                .ReturnsAsync(new List<Order>());

            var controller = new OrdersController(mockOrderService.Object);

            // Act
            var result = await controller.GetOrder(userId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostOrder_ValidOrder_ReturnsCreatedOrder()
        {
            // Arrange
            var mockOrderService = new Mock<IOrderService>();
            var newOrder = new Order { UserId = 1, Status = "Pending" };
            mockOrderService.Setup(s => s.CreateOrderAsync(newOrder))
                .ReturnsAsync(new Order { Id = 1, UserId = 1, Status = "Pending" });

            var controller = new OrdersController(mockOrderService.Object);

            // Act
            var result = await controller.PostOrder(newOrder);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var order = Assert.IsType<Order>(createdAtActionResult.Value);
            Assert.Equal(1, order.Id);
        }


        [Fact]
        public async Task DeleteOrder_NonExistingOrder_ReturnsNotFound()
        {
            // Arrange
            var mockOrderService = new Mock<IOrderService>();
            mockOrderService.Setup(s => s.DeleteOrderAsync(1))
                .ThrowsAsync(new KeyNotFoundException());

            var controller = new OrdersController(mockOrderService.Object);

            // Act
            var result = await controller.DeleteOrder(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
