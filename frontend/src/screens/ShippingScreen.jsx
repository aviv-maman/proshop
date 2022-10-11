import React, { useReducer } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formReducer = (state, event) => {
    return { ...state, [event.name]: event.value };
  };

  const [formData, setFormData] = useReducer(formReducer, {
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
  });

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      name: event.target.name,
      value: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate('/payment');
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='address'>
          <FormLabel>Address</FormLabel>
          <FormControl
            name='address'
            type='text'
            placeholder='Enter address'
            value={formData.address}
            onChange={handleChange}
            required></FormControl>
        </FormGroup>

        <FormGroup controlId='city'>
          <FormLabel>City</FormLabel>
          <FormControl
            name='city'
            type='text'
            placeholder='Enter city'
            value={formData.city}
            onChange={handleChange}
            required></FormControl>
        </FormGroup>

        <FormGroup controlId='postalCode'>
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            name='postalCode'
            type='text'
            placeholder='Enter postal code'
            value={formData.postalCode}
            onChange={handleChange}
            required></FormControl>
        </FormGroup>

        <FormGroup controlId='country'>
          <FormLabel>Country</FormLabel>
          <FormControl
            name='country'
            type='text'
            placeholder='Enter country'
            value={formData.country}
            onChange={handleChange}
            required></FormControl>
        </FormGroup>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
