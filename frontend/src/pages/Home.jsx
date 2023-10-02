import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/message';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.message}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map(product => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
