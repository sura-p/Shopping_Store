import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { Axios } from 'axios';
import React, { useEffect } from 'react'
import { ListGroupItem } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useIsRTL } from 'react-bootstrap/esm/ThemeProvider';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox'
import { fetchorder, pay } from '../Services/Actions/action';
import { getError } from '../utils';
function OrderScreen() {
    const dispatch = useDispatch()
    const userInfo=  useSelector(state=>state.product.userInfo)
    const order=  useSelector(state=>state.orderlist)
   
    const navigate = useNavigate();
    const params = useParams();
    const {id:orderId} = params;
   
    
  const [{isPending},paypalDispatch] = usePayPalScriptReducer()

    function createorder (data,actions){
      return actions.order.create({
        purchase_units:[{
          amount:{value:order.order.totalPrice}
        }]
      }).then((orderId)=>{
        return orderId
      })
    }
  
  function onApprove(data,actions){
    return actions.order.capture().then(async function (details){
     dispatch(pay({id:order.order._id ,user:userInfo,detail:details,data:data}))
    })
  }
  
  function onError(error){
    toast.error(error)
  }
  useEffect(()=>{


        if(!userInfo){
            return navigate('/signin');
        }

        
        if (!order.order._id || (order.order._id && order.order._id !== orderId)) {
            dispatch(fetchorder({id:orderId,userInfo}))
        }
        else{
          axios({
            method:'get',
            url:'/api/keys/paypal',

            headers: {
              authorization:`Bearer ${userInfo.token}`
            }
    
          }).then((res)=>{
            
            paypalDispatch({
              type:'resetOption',
              value:{
                'client-id':res.data,
                currency:'USD'
              }
            })
            paypalDispatch({type:'setLoadingStatus',value:'pending'})
          })

        }
    },[userInfo,orderId,navigate,order.order._id ,dispatch ,paypalDispatch])
  return order.loading ? (
      <LoadingBox></LoadingBox>
    
  ): order.error  ? (
      <MessageBox></MessageBox>
  ):
  (<div>

<Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.order.shippingAddress.Address},
                {order.order.shippingAddress.City}, {order.order.shippingAddress.Postal}
               
                &nbsp;
                {/* {order.shippingAddress.location &&
                  order.shippingAddress.location.lat && (
                    <a
                      target="_new"
                      href={`https://maps.google.com?q=${order.order.shippingAddress.location.lat},${order.order.shippingAddress.location.lng}`}
                    >
                      Show On Map
                    </a>
                  )} */}
              </Card.Text>
              {order.order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.order.paymentMethod}
              </Card.Text>
              {order.order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {
                  !order.isPaid && (
                    <ListGroup.Item>
                      {isPending ? (<LoadingBox/>):(<div>
                        <PayPalButtons
                        createOrder={createorder}
                        onApprove={onApprove}
                        onError={onError}
                        ></PayPalButtons>
                      </div>)}
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  </div>)
}

export default OrderScreen