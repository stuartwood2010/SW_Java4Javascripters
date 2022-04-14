import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER } from '../utils/queries';

function OrderHistory() {
  const { loading, data } = useQuery(USER);
  let user;

  if (data) {
    user = data.user;
  }
   console.log(data);
  if (loading) {
    return <h2>LOADING...</h2>;
}
  return (
    <>
      <div className="container">
        <Link to="/" className="backToProducts">← Back to Products</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : 
        <h1>No user found</h1>}
      </div>
    </>
  );
}

export default OrderHistory;
