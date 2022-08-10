import { Button } from "react-bootstrap";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../Component/MessageBox";
import { addtocart, removefromcart } from "../Services/Actions/action";
import { Card } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CartScreen() {
    const navigate = useNavigate()
  const data = useSelector((state) => state.product.CartsItems);
  console.log(data);
  const dispatch = useDispatch();

  const checkoutHandler =()=>{
      navigate('/signin?redirect=/shipping');
  }

  const updateCartHandler = (item) => {
    dispatch(addtocart(item));
  };
  const removecartitem = (item) => {
    dispatch(removefromcart(item));
  };
  return (
    <div>
      <Helmet>
        <title>Your Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {data.length === 0 ? (
            <MessageBox>
              Cart is Empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {data.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.qty === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        onClick={() => updateCartHandler(item.id)}
                        variant="light"
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>

                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removecartitem(item.id)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                  <ListGroup.Item>
                      <h3>
                          Subtotal ({data.reduce((a,c)=>a +c.qty,0)}{' '}items) :${data.reduce((a,c)=>a +c.price *c.qty,0)}
                      </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <div className="d-grid">
                          <Button type="button" variant="primary" disabled={data.length==0 } onClick={checkoutHandler}>
                              Proceed to Checkout
                          </Button>
                      </div>
                  </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
