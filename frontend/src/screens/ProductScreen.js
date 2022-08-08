import axios from "axios";
import { Button } from "react-bootstrap";
import React, { useEffect, useReducer } from "react";
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import logger from "use-reducer-logger";
import Rating from "../Component/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";
import { addtocart } from "../Services/Actions/action";
import { useDispatch, useSelector } from "react-redux";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true };
//     case "FETCH_SUCESS":
//       return { ...state, product: action.payload, loading: false };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  console.log(slug);
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const addtocarthandler = (id) => {
    console.log(data.product.CartsItems);
    const existsItem = data.product.CartsItems.find((x)=> x[0].id == id);
    console.log(existsItem);
    
    const quantity = existsItem?existsItem.quantity + 1:1;
    //console.log(quantity);
    const data1=data.product.products.filter((ele) => {
      return ele.id == id;
    });
    //console.log(data1);
   if(data1[0].countInStock < quantity){
     window.alert('sorry, product is out of stock')
   }
    dispatch(addtocart(id));
  };
 
  // const dispatch = useDispatch()
  // const addtocarthandler = (id) => {
  //   dispatch(addtocart(id));
  // };
  // const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
  //   product: [],
  //   loading: true,
  //   error: "",
  // });
  //  const [product ,setproducts] =useState([])
  console.log(data.product.products);
  const toshow = data.product.products.filter((ele) => {
    return ele.id == 1;
  });
  console.log(toshow);

  return(
    data.product.loading ? (
      <LoadingBox />
    ) : data.product.error ? (
      <MessageBox variant="danger">{data.product.error}</MessageBox>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <img className="img-large" src={toshow[0].image} alt={toshow[0].name}></img>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{toshow[0].name}</title>
                </Helmet>
                <h1>{toshow.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={toshow.rating}
                  numReviews={toshow.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price : ${toshow[0].price}</ListGroup.Item>
              <ListGroup.Item>
                Description : <p>{toshow[0].description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${toshow[0].price}</Col>
                    </Row>
                  </ListGroup.Item>
  
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {toshow[0].countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
  
                  {toshow[0].countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={()=>addtocarthandler(toshow[0].id)} variant="primary">Add to Cart</Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  )
  
 
  
  
}

export default ProductScreen;
