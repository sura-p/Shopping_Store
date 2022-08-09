import logo from "./logo.svg";
import "./App.css";
//import data from "../../Server/data/data";
import {Link} from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Navbar,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Nav } from "react-bootstrap";
import { CarouselItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import CartScreen from "./screens/CartScreen";

function App() {
  const data = useSelector((state) => state);
  
  return (
   
    <div className="d-flex flex-column site-container">
    
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Shopping_cart</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {
                  data.product.CartsItems.length > 0 && (<Badge pill bg ='danger'>
                    {data.product.CartsItems.length}
                  </Badge>)
                }
              </Link>
            </Nav>
          </Container>
        </Navbar>
        {/* <Link to="/">Shopping_cart</Link> */}
      
      <main>
        <Container className="mt-3">
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/cart' element={<CartScreen/>}/>
          <Route path='/product/:slug' element={<ProductScreen/>}/>
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
