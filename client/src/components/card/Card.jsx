import React, { useEffect } from 'react';
import ProductItem from '../productItem/ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import './card.scss';
function ProductCards() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  const myProducts = data?.products;
  return (
    <div className="page"> 
      <h2>J4J Store:</h2>
      <div className="my-2 container">
        {state.products.length ? (
        <div className="card">
          <div>
            {myProducts.map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                description={product.description}
              />
            ))}
          </div>
        </div>
        ) : (
          <h3>You haven't added any products yet!</h3>
        )}
        {loading ? "loading" : null}
      </div>
    </div>
  );
}

export default ProductCards;