import React from 'react';
import { useQuery } from '@apollo/client';
import {PRODUCTS} from '../../utils/queries'
import './card.scss';
// In `Card`, we can assign a style from an object by using curly braces
// We are assigning the card, heading, and content all from our `style` object
const ProductCards = () => {
    const {loading, data} = useQuery(PRODUCTS);
    const myProducts = data?.products;
    console.log(myProducts);
    if (loading) {
      return <h2>LOADING...</h2>;
    }
    return (
      myProducts.map((product) => {
        return (
          <div className="productCards">
            <div><h2>{product.name}</h2></div>
            <div>
              <div className="card-body">
                <p className="card-title">{product.description}</p>
                <p className="card-title"> $ {product.price}</p>
              </div>
            </div>
          </div>
        )
      })
    );
}
export default ProductCards;

