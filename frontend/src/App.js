import logo from "./logo.svg";
import "./App.css";
import data from "./data";
import {Link} from 'react-router-dom'
function App() {
  console.log(data);
  return (
    <div>
      <header>
        <a href="/">Shopping_cart</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              
              <img src={product.image} alt={product.name} />
              
              <div className="product-info">
              <p>{product.name}</p>
              <p>{product.price}</p>

              <button>Add to cart</button>
              </div>
              
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
