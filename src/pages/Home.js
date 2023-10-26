import Footer from '../features/common/Footer';
import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/productList/components/ProductList';
function Home() {
  return (
    <>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </>
  );
}

export default Home;
