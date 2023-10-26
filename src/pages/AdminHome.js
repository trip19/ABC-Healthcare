import Navbar from '../features/navbar/Navbar';
import AdminProductList from '../features/admin/components/AdminProductList';
function AdminHome() {
  return (
    <Navbar>
      <AdminProductList></AdminProductList>
    </Navbar>
  );
}

export default AdminHome;
