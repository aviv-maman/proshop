import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { isLoading, error } = userRegister;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [formError, setFormError] = useState({
    name: '',
    email: '',
    password: '',
    server: error || '',
  });

  const validationErrors = Object.entries(formError) || null;

  function handleChange(event) {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.id]: event.target.value,
    }));
    setFormError((previousState) => ({
      ...previousState,
      [event.target.id]: '',
      server: '',
    }));
    if (event.target.id === 'passwordConfirm') {
      setFormError((previousState) => ({
        ...previousState,
        password: '',
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError({
      name: '',
      email: '',
      password: '',
      server: error,
    });
    if (formData.password !== formData.passwordConfirm) {
      setFormError({ password: 'Passwords do not match' });
    } else {
      try {
        dispatch(
          register(formData.name, formData.email, formData.password, formData.passwordConfirm)
        );
      } catch (error) {
        console.log(error.message);
        setFormError({ server: error.message });
      }
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {Object.entries(validationErrors) &&
        validationErrors.map((element) => (
          <Message variant='danger' key={element[0]} display={element[1] ? true : false}>
            {element[1]}
          </Message>
        ))}

      {/* {error && <Message variant='danger'>{error}</Message>} */}

      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter name'
            value={formData.name}
            onChange={handleChange}></FormControl>
        </FormGroup>
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
        <FormGroup controlId='passwordConfirm'>
          <FormLabel>Password Confirmation</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter password confirmation'
            value={formData.passwordConfirm}
            onChange={handleChange}></FormControl>
        </FormGroup>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Existing Customer? <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
