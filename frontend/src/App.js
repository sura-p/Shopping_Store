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
function App() {
 
  return (
   
    <div className="d-flex flex-column site-container">
    
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Shopping_cart</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
        {/* <Link to="/">Shopping_cart</Link> */}
      
      <main>
        <Container>
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
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
