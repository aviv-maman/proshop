import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = () => {
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, isLoading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { isLoading: isLoadingPay, success: successPay } = orderPay;

  if (!isLoading && order) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/config/paypal`
      );
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== id || successPay) {
      dispatch({ type: 'ORDER_PAY_RESET' });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, id, successPay]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={'danger'}>{error}</Message>
  ) : (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <span className='fw-semibold'>Name: </span> {order?.user.name}
              </p>
              <p>
                <span className='fw-semibold'>Email Address: </span> {order?.user.email}
              </p>
              <p>
                <span className='fw-semibold'>Address: </span>
                {order?.shippingAddress.address}, {order?.shippingAddress.city}{' '}
                {order?.shippingAddress.postalCode}, {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Message variant={'success'}>Delivered on {order?.deliveredAt}</Message>
              ) : (
                <Message variant={'danger'}>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <span className='fw-semibold'>Method: </span>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant={'success'}>Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant={'danger'}>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order?.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            {!order?.isPaid && (
              <ListGroup.Item>
                {isLoadingPay && <Loader />}
                {!sdkReady ? <Loader /> : <Button>Buy</Button>}
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
