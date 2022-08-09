
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import axios from 'axios'
import logger from 'use-reducer-logger'
import { Col, Row } from "react-bootstrap";
import Product from "../Component/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";
import { fetchdata } from "../Services/Actions/action";
import {useDispatch,useSelector} from 'react-redux';
// const reducer = (state, action) => {
//   switch (action.type) {
    
//   }
// };
function HomeScreen() {
  // const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    const data = useSelector(state=>state)
  // });
  const dispatch = useDispatch()
  //  const [product ,setproducts] =useState([])
  useEffect(() => {
  dispatch(fetchdata())
  }, [])
  return (
    <div>
      <Helmet><title>Shopping Cart</title></Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {data.product.loading ? (<LoadingBox/>) : data.product.error ? (<MessageBox variant='danger'>{data.product.error}</MessageBox>) : (

          <Row>
            {


              data.product.products.map((product) => (
                <Col sm={2} md={3} lg={4} className="mb-3" key={product.slug}>
                <Product product={product} ></Product>
                </Col>
              ))}
          </Row>)}

      </div>
    </div>
  );
}

export default HomeScreen;
