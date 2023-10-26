import Navbar from '../features/navbar/Navbar';
import UserOrders from '../features/user/comonents/UserOrders';
function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
}

export default UserOrdersPage;
