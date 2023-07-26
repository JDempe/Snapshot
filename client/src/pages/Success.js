import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const location = useLocation();

  useEffect(() => {
    async function saveOrder() {
      const stripe = await stripePromise;
      const sessionId = new URLSearchParams(location.search).get('session_id');
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      const products = session.line_items.data.map((item) => ({
        _id: item.price.product,
        quantity: item.quantity
      }));

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder, location]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;