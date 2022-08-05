import logo from "./logo.svg";
import "./App.css";
//import data from "../../Server/data/data";
import {Link} from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
function App() {
 
  return (
   
    <div>
      <header>
        <Link to="/">Shopping_cart</Link>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/product/:slug' element={<ProductScreen/>}/>
        </Routes>
        
      </main>
    </div>
  
  );
}

export default App;
