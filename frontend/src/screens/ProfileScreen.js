import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { updateuser } from '../Services/Actions/action'

function ProfileScreen() {
    const userInfo=  useSelector(state=>state.product.userInfo)
   const dispatch = useDispatch();
  
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
  
    const submitHandler =  (e) => {
        e.preventDefault();
        dispatch(updateuser({info:userInfo,Name:name,email:email,pass:password}));
      };

    return (
    <div className="container small-container">
    <Helmet>
      <title>User Profile</title>
    </Helmet>
    <h1 className="my-3">User Profile</h1>
    <form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <div className="mb-3">
        <Button type="submit">Update</Button>
      </div>
    </form>
  </div>
  )
}

export default ProfileScreen