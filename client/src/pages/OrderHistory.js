import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { id } = useParams();

  console.log('id:', id); // Log the id

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { _id: id },
  });

  console.log('loading:', loading); 
  console.log('error:', error); 
  console.log('data:', data); 

  let user;

  if (data) {
    user = data.user;
  }
  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.length ? (
              user.orders.map((order, index) => (
                <div key={order._id || index} className="my-2">
                  <h3>
                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                  </h3>
                  <h4>Order Number: {order._id || "No Order ID"}</h4>
                  <div className="flex-row">
                    {order.products.map(({ photo: { _id, title, price, size, quantity }}, index) => (
                      <div key={index} className="card px-1 py-1">
                        <Link to={`/products/${_id}`}>
                          <p>{title}</p>
                        </Link>
                        <div>
                          <span>${price}</span>
                        </div>
                        <div>
                          <span>Size: {size}</span>
                          <span>Quantity: {quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <h4>You have no orders</h4>
            )}
          </>
        ) : (
          <h4>Please log in to see your order history</h4>
        )}
      </div>
    </>
  );
}

export default OrderHistory;