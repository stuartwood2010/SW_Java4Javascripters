import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {PRODUCTS} from '../../utils/queries'
import './card.scss';
// In `Card`, we can assign a style from an object by using curly braces
// We are assigning the card, heading, and content all from our `style` object
const ProductCards = () => {
  
  const [count, setCount] = useState(1);
  const {loading, data} = useQuery(PRODUCTS);
  const myProducts = data?.products;
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
      myProducts.map((product) => {
        return (
          <div className="card">
            <div className="productCards">
              <h2 className="cardTitle">{product.name}</h2>
              <div className="cardContent">
                <div className="card-body">
                  <p className="card-title">{product.description}</p>
                  <p className="card-title"> $ {product.price}</p>
                </div>
                <div className="cartBtns">
                  <button className="decrementBtn" onClick={() => setCount(count - 1)}>-</button>
                  <input className="cartQuantity" value={count}></input>
                  <button className="incrementBtn" onClick={() => setCount(count + 1)}>+</button>
                </div>
                <button className="btn btn-primary addToCartBtn">Add To Cart</button>
              </div>
            </div>
          </div>

        )
      })
    );
}
export default ProductCards;

