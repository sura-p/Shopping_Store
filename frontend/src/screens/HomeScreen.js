
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import axios from 'axios'
import logger from 'use-reducer-logger'
import { Col, Row } from "react-bootstrap";
import Product from "../Component/Product";
import { Helmet } from "react-helmet-async";
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: ''
  });
  //  const [product ,setproducts] =useState([])
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios({
          method: 'get',
          url: '/api/products',
          headers: {
            'Content-Type': 'application/json'
          }

        })
          .then(function (response) {
            dispatch({ type: 'FETCH_SUCESS', payload: response.data });
          })

      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })

      }


    }
    fetchdata();
  }, [])
  return (
    <div>
      <Helmet><title>Shopping Cart</title></Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (<div>Loading...</div>) : error ? (<div>{error}</div>) : (

          <Row>
            {


              products.map((product) => (
                <Col sm={2} md={3} lg={4} className="mb-3">
                <Product product={product}></Product>
                </Col>
              ))}
          </Row>)}

      </div>
    </div>
  );
}

export default HomeScreen;
