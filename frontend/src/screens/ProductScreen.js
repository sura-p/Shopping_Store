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

  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  console.log(data);
  const addtocarthandler = (id) => {
  //  const existsItem = data.product.CartsItems.find((x)=> x.item.id == id);
    
  //  console.log(existsItems);
   

  //  const quantity = existsItem?existsItem.quantity++ : 1 ;
  // console.log("quantity",quantity);
    
    
   
   
   
    dispatch(addtocart(id));
    
   
  
   
   }
    
  
 
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
 
  const toshow = data.product.products.find((ele) => {
    return ele.id == slug;
  });
  
  

  return(
    data.product.loading ? (
      <LoadingBox />
    ) : data.product.error ? (
      <MessageBox variant="danger">{data.product.error}</MessageBox>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <img className="img-large" src={toshow.image} alt={toshow.name}></img>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{toshow.name}</title>
                </Helmet>
                <h1>{toshow.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={toshow.rating}
                  numReviews={toshow.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price : ${toshow.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : <p>{toshow.description}</p>
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
                      <Col>${toshow.price}</Col>
                    </Row>
                  </ListGroup.Item>
  
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {toshow.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
  
                  {toshow.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={()=>addtocarthandler(toshow.id)} variant="primary">Add to Cart</Button>
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
