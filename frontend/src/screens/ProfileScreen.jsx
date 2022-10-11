import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUser, updateUser } from '../actions/userActions';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading, error, isSuccessful, userInfo } = userLogin;

  const formReducer = (state, event) => {
    return { ...state, [event.name]: event.value };
  };

  const [formData, setFormData] = useReducer(formReducer, {
    name: userInfo.name || '',
    email: userInfo.email || '',
  });

  const [formError, setFormError] = useState({
    name: '',
    email: '',
    password: '',
    server: error || '',
  });

  useEffect(() => {
    dispatch(getUser('me'));
    setFormData(userInfo);
    console.log(userInfo);
  }, [dispatch]);

  const validationErrors = Object.entries(formError) || null;

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      name: event.target.name,
      value: value,
    });
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
  };

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
        dispatch(updateUser('updateMe', { name: formData.name }));
      } catch (error) {
        console.log(error.message);
        setFormError({ server: error.message, success: true });
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {Object.entries(validationErrors) &&
          validationErrors.map((element) => (
            <Message variant='danger' key={element[0]} display={element[1] ? true : false}>
              {element[1]}
            </Message>
          ))}

        {isLoading && <Loader />}

        {!error && !isLoading && isSuccessful && (
          <Message variant='success'>Profile was successfully updated</Message>
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId='name'>
            <FormLabel>Name</FormLabel>
            <FormControl
              name='name'
              type='text'
              placeholder='Enter name'
              value={formData.name || ''}
              onChange={handleChange}></FormControl>
          </FormGroup>
          <FormGroup controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl
              name='email'
              type='email'
              placeholder='Enter email'
              value={formData.email || ''}
              onChange={handleChange}></FormControl>
          </FormGroup>
          <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl
              name='password'
              type='password'
              placeholder='Enter password'
              value={formData.password || ''}
              onChange={handleChange}></FormControl>
          </FormGroup>
          <FormGroup controlId='passwordConfirm'>
            <FormLabel>Password Confirmation</FormLabel>
            <FormControl
              name='passwordConfirm'
              type='password'
              placeholder='Enter password confirmation'
              value={formData.passwordConfirm || ''}
              onChange={handleChange}></FormControl>
          </FormGroup>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
