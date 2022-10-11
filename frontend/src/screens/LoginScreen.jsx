import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading, error } = userLogin;

  function handleChange(event) {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.id]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch(login(formData.email, formData.password));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={handleChange}></FormControl>
        </FormGroup>
        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}></FormControl>
        </FormGroup>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer? <Link to={'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
