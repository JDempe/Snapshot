import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCartPlus } from '@fortawesome/free-solid-svg-icons';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  useEffect(() => {
    let cartCloseTimer = null;

    function handleMouseMovement() {
      // Reset the timer whenever there is mouse movement inside the cart
      clearTimeout(cartCloseTimer);
      cartCloseTimer = null;
    }

    function handleMouseClickOutside(event) {
      const cartElement = document.querySelector('.cart');

      if (!cartElement.contains(event.target)) {
        // If the click is outside the cart, close it
        toggleCart();
      }
    }

    if (state.cartOpen) {
      // Start the timer when the cart is open
      cartCloseTimer = setTimeout(() => {
        toggleCart();
      }, 15000);
    }

    window.addEventListener('mousemove', handleMouseMovement);
    window.addEventListener('click', handleMouseClickOutside);

    // Cleanup event listeners and timer when the component unmounts
    return () => {
      clearTimeout(cartCloseTimer);
      cartCloseTimer = null;
      window.removeEventListener('mousemove', handleMouseMovement);
      window.removeEventListener('click', handleMouseClickOutside);
    };
  }, [state.cartOpen, toggleCart]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        <FontAwesomeIcon
          icon={faClose}
          color="#EFD81D"
          style={{
            height: '7%',
            width: '7%',
            position: 'relative',
            right: '-92%',
          }}
        />
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            <div>
              <button onClick={submitCheckout}>Checkout</button>
              {!Auth.loggedIn() && (
                <p>
                  <Link
                    to="/login"
                    className="checkout-link"
                    style={{ color: '#000' }}>
                    (Log in to check out)
                  </Link>
                </p>
              )}
            </div>

            {/* {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <Link
                to="/login"
                className="checkout-link"
                style={{ color: '#000' }}>
                (log in to check out)
              </Link>
            )} */}
          </div>
        </div>
      ) : (
        <h5 style={{ color: 'gray', marginLeft: '3%' }}>
          {' '}
          <FontAwesomeIcon
            icon={faCartPlus}
            color="#EFD81D"
            style={{ height: '7%', width: '7%' }}
          />
          &nbsp;&nbsp;Your Shopping Cart is Empty...
        </h5>
      )}
    </div>
  );
};

export default Cart;
