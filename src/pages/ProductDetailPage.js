import Footer from '../features/common/Footer';
import Navbar from '../features/navbar/Navbar';
import ProductDetail from '../features/productList/components/ProductDetail';
function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
    </div>
  );
}

export default ProductDetailPage;
