import { Button } from 'react-bootstrap';
import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import MessageBox from '../Component/MessageBox';
import { addtocart, removefromcart } from '../Services/Actions/action';

function CartScreen() {
    const data = useSelector(state=>state.product.CartsItems)
   console.log(data);
   const dispatch = useDispatch()
   
    const updateCartHandler = (item)=>{
        
        dispatch(addtocart(item));
   
    }
   const  removecartitem=(item)=>{
            dispatch(removefromcart(item))
    }
  return (
    <div>
        <Helmet>
            <title>Your Cart</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row>
            <Col md={8}>
                {data.length ===0 ? (<MessageBox>
                    Cart is Empty. <Link to='/'>Go Shopping</Link>
                </MessageBox>)
                :
                (<ListGroup>
                    {data.map((item)=>(
                        
                        <ListGroup.Item key={item[0]?.id}>
                            <Row className='align-items-center'>
                            <Col md={4}>
                                <img src={item[0]?.image}
                                alt={item[0]?.name}
                                className='img-fluid rounded img-thumbnail'>

                                </img>
                                </Col> 
                                <Col md={3}>
                                    <Button variant="light" disabled={item[0]?.quantity===1}>
                                        <i className='fas fa-minus-circle'></i>
                                    </Button>
                                    <span>{item[0]?.quantity}</span>
                                    <Button onClick={()=>updateCartHandler(item[0]?.id)} variant="light" disabled={item[0]?.quantity===1}>
                                        <i className='fas fa-plus-circle'></i>
                                    </Button>
                                    </Col> 

                                    <Col md={3}>${item[0]?.price}</Col>
                                    <Col md={2}>
                                        <Button onClick={()=>removecartitem(item[0]?.id)} variant='light' ><i className='fas fa-trash'></i></Button>
                                    </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>)}
            </Col>

            <Col md={4}></Col>
        </Row>
    </div>
  )
}

export default CartScreen