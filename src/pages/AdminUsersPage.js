import Navbar from '../features/navbar/Navbar';
import AdminUsers from '../features/admin/components/AdminUsers';
function AdminUsersPage() {
  return (
    <div>
      <Navbar>
        <AdminUsers></AdminUsers>
      </Navbar>
    </div>
  );
}

export default AdminUsersPage;
