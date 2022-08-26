import logo from "./logo.svg";
import "./App.css";
//import data from "../../Server/data/data";
import {Link} from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Navbar,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Nav } from "react-bootstrap";
import { CarouselItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import CartScreen from "./screens/CartScreen";
import { useEffect, useState } from "react";
import { NavItem } from "react-bootstrap";
import SigninScreen from "./screens/SigninScreen";
import { NavDropdown } from "react-bootstrap";
import { signout } from "./Services/Actions/action";
import ShippingAddress from "./screens/ShippingAddress";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import OdrderHistory from "./screens/OdrderHistory";

function App() {
  const data = useSelector((state) => state.product.CartsItems);

  const userinfo = useSelector((state)=>state.product)
 
  // const check =userinfo.length>0?true:false;
  // console.log(check);
  const[count,setcount]=useState(0)
  const dispatch = useDispatch()
  useEffect(()=>{
    let i=0;
    data?.forEach((element) => {
         i=+element.qty 
      
    });
    setcount(i)
  },[count,data])
  
  const signouthandler=()=>{
    dispatch(signout());
    localStorage.removeItem('userInfo')
  }
  return (
   
    <div className="d-flex flex-column site-container">
       <ToastContainer position="bottom-center" limit={1} />
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Shopping_cart</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {
                  data.length > 0 && (<Badge pill bg ='danger'>
                    {count}
                  </Badge>)
                }
              </Link>
              {userinfo.userInfo?(<NavDropdown title={userinfo.userInfo?.name} id="basic-nav-dropdown">
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>User Profile</NavDropdown.Item> 
                </LinkContainer>
                <LinkContainer to='/orderhistory'>
                  <NavDropdown.Item>Order History</NavDropdown.Item> 
                </LinkContainer>
                <NavDropdown.Divider/>
                <Link className="dropdown-item"
                to='#signout'
                onClick={signouthandler}
                >Sign Out</Link>
              </NavDropdown>):(<Link className='nav-link' to='/signin'>
              SignIN</Link>)}
            </Nav>
          </Container>
        </Navbar>
        {/* <Link to="/">Shopping_cart</Link> */}
      
      <main>
        <Container className="mt-3">
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/cart' element={<CartScreen/>}/>
          <Route path='/signin' element={<SigninScreen/>}/>
          <Route path='/signup' element={<SignupScreen/>}/>
          <Route path='/product/:slug' element={<ProductScreen/>}/>
          <Route path='/shipping' element={<ShippingAddress/>}/>
          <Route path='/payment' element={<PaymentMethod/>}/>
          <Route path='/placeorder' element={<PlaceOrder/>}/>
          <Route path='/order/:id' element={<OrderScreen/>}/>
          <Route path='/orderhistory' element={<OdrderHistory/>} />
        </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">
          All rights reserved
        </div>
      </footer>
    </div>
  
  );
}

export default App;
