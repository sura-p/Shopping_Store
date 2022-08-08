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

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    product: [],
    loading: true,
    error: "",
  });
  //  const [product ,setproducts] =useState([])
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios({
          method: "get",
          url: `/api/products/slug/${slug}`,
          headers: {
            "Content-Type": "application/json",
          },
        }).then(function (response) {
          dispatch({ type: "FETCH_SUCESS", payload: response.data });
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchdata();
  }, [slug]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
              <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              >

              </Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Price : ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description : <p>{product.description}</p>
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
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock>0?<Badge bg="success">In Stock</Badge>:<Badge bg="danger">Unavailable</Badge>}</Col>
                  </Row>
                </ListGroup.Item>

                  {
                    product.countInStock> 0 &&(<ListGroup.Item>
                      <div className="d-grid">
                        <Button variant ="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>)
                  }

              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
