import { Form, Button } from 'react-bootstrap';
import useForm from '../utils/useForm';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress, cartItems } = cart;
  const initialState = shippingAddress
    ? { ...shippingAddress }
    : {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      };
  const [formData, handleInput] = useForm(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ ...formData }));
    if (cartItems.length > 0) {
      navigate('/payment');
    } else {
      toast.error(`Cart cannot be empty to checkout`);
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      {cartItems.length > 0 ? (
        ''
      ) : (
        <Message variant='danger'>
          <Link to='/'> Go back</Link> to shopping, Cart is empty!!!
        </Message>
      )}
      <h1 className='mb-2'>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            name='address'
            type='text'
            placeholder='Door No, Street'
            value={formData.address}
            onChange={handleInput}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            name='city'
            type='text'
            placeholder='Enter City'
            value={formData.city}
            onChange={handleInput}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name='postalCode'
            type='text'
            placeholder='Enter Zip'
            value={formData.postalCode}
            onChange={handleInput}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='my-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            name='country'
            type='text'
            placeholder='Enter Country'
            value={formData.country}
            onChange={handleInput}
            required
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          // disabled={isLoading}
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
