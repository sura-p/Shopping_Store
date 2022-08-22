import { Button } from 'react-bootstrap'
import React from 'react'
import { Col } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckSteps from '../Component/CheckSteps'
import { placeorder } from '../Services/Actions/action'
import LoadingBox from '../Component/LoadingBox'

function PlaceOrder() {
const data = useSelector(state=>state.product.shippingAddress)
const data1 = useSelector(state=>state.product.paymentMethod)
const data2 = useSelector(state=>state.product.CartsItems)
const data3 = useSelector(state=>state.product)
const data4 = useSelector(state=>state.order)
const dispatch = useDispatch()

const placeOrderHandle=(data)=>{
    dispatch(placeorder(data))
}
  const round2 = (num)=> Math.round(num*100 + Number.EPSILON)/100;
  data3.itemprice=round2(data2.reduce((a,c)=> a+c.qty *c.price,0));
data3.Shippingprice = data3.itemprice>100?round2(30):round2(0);
data3.taxprice = round2(0.15 *data3.itemprice);
data3.totalprice = data3.itemprice+data3.Shippingprice+data3.taxprice;


  return (
    <div>
        <CheckSteps step1 step2 step3 step4></CheckSteps>
        <Helmet>
            <title>Preview Order</title>
        </Helmet>
        <h1 className='my-3'>Preview Order</h1>
        <Row>
            <Col md={8}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {data.fullName}<br/>
                                <strong>Address:</strong>{data.Address},{data.City},{data.Postal}<br/>
                            </Card.Text>
                            <Link to='/shipping'>Edit</Link>
                        </Card.Body>
                    </Card>
            
            </Col>

            <Col md={8}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {data1}<br/>
                               
                            </Card.Text>
                            <Link to='/payment'>Edit</Link>
                        </Card.Body>
                    </Card>
            

            <Card className='mb-3'>
                <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant='flush'>
                        {data2.map((item)=>(
                            <ListGroup.Item key={item._id}>
                                <Row className='align-items-center'>
                                    <Col md={6}>
                                        <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail'></img>{' '}
                                        <Link to={`product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}><span>{item.qty}</span></Col>
                                    <Col md={3}><span>${item.price}</span></Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Link to={'/cart'}>Edit</Link>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${data3.itemprice}</Col>
                            </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${data3.Shippingprice}</Col>
                            </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${data3.taxprice}</Col>
                            </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <Row>
                                <Col><strong>Order Total</strong></Col>
                                <Col><strong>${data3.totalprice}</strong></Col>
                            </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <div className='d-grid'>
                                <Button type='button'
                                onClick={()=>placeOrderHandle(data3)}
                                disabled= {data2.length===0}>
                                    PlaceOrder
                                </Button>
                            </div>
                            {data4.loading && <LoadingBox></LoadingBox>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrder