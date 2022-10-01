import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Card.Title as='div'>
          <span className='fw-semibold'>{product.name}</span>
        </Card.Title>
      </Card.Body>

      <Card.Text as='div'></Card.Text>
      <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>

      <Card.Text as='h3'>${product.price}</Card.Text>
    </Card>
  );
};

export default Product;
