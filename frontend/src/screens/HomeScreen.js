https://youtu.be/CDtPMR5y0QU
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import data from "../../../Server/data/data";
import axios from 'axios'
function HomeScreen() {
    const [product ,setproducts] =useState([])
    useEffect(()=>{
        const fetchdata = async ()=>{
            const result = await axios({
                method: 'get',
                url: '/api/products',
               
                headers: { 'Content-Type': 'application/json'}
              })
                .then(function (response) {
                    console.log(response);
                    setproducts(result);
                }).catch(error => {
                    console.log(error.response)
                });
           
        }  
        fetchdata();    
    },[])
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {product.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
                <Link to={`/product/${product.slug}`}>
              <p>{product.name}</p>
              </Link>
              <p><strong>$ {product.price}</strong></p>

              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
