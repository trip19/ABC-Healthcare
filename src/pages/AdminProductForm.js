import Navbar from '../features/navbar/Navbar';
import ProductForm from '../features/admin/components/ProductForm';
function AdminProductFormPage() {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  );
}

export default AdminProductFormPage;
