import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { isLoading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'></Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Button className='w-100' type='button' disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
