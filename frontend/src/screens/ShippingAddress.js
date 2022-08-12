import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import CheckSteps from "../Component/CheckSteps";
import { saveshipping } from "../Services/Actions/action";

function ShippingAddress() {
  const data = useSelector((state=>state.product.shippingAddress))
  const userInfo = useSelector((state=>state.product.userInfo))
  console.log(userInfo);
  const navigate = useNavigate()
  const [fullName, SetfullName] = useState(data.fullName||"");
  const [Address, SetAddress] = useState(data.Address||"");
  const [City, SetCity] = useState(data.City||"");
  const [Postal, SetPostalcode] = useState(data.Postal||"");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveshipping({fullName,Address,City,Postal}))
    
    localStorage.setItem('shippingAddress',JSON.stringify({fullName,Address,City,Postal}))
   navigate('/payment')
  };

  useEffect(()=>{
    if(!userInfo){
      navigate('/signin')
    }
  })
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckSteps step1 step2 />
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="fullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => SetfullName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={Address}
              onChange={(e) => SetAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={City}
              onChange={(e) => SetCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="postalcode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={Postal}
              onChange={(e) => SetPostalcode(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ShippingAddress;
