import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addtocart } from '../Services/Actions/action';
import Rating from './Rating';

function Product(props) {
  const dispatch = useDispatch();
    const {product}=props;
    
    const addtocarthandler = (id) => {
      dispatch(addtocart(id));
    };
  return (
    <Card key={product.slug}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                  </Link>
                  <Card.Body>
   
                    <Link to={`/product/${product.slug}`}>
                      <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Rating rating ={product.rating} numReviews={product.numReviews}></Rating>
                    <Card.Text>${product.price}</Card.Text> 
                    <Button onClick={()=>addtocarthandler(product.id)} >Add to cart</Button>
                    </Card.Body>
                    
                </Card>
  )
}

export default Product