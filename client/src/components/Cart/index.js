import React, { useEffect, useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_ORDERS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { initiateCheckout } from '../../utils/mutations';


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
// stop
const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [isClosing, setIsClosing] = useState(false); 
  const [isCartIconClicked, setIsCartIconClicked] = useState(false);
  const [checkoutMutation, { data }] = useMutation(initiateCheckout);
  useEffect(() => {
    if (data && data.initiateCheckout && data.initiateCheckout.id) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.initiateCheckout.id });
      });
    }
  }, [data]);

  const toggleCart = useCallback(() => {
    if (state.cartOpen) {
      console.log('Closing the cart...');
      setIsClosing(true);
      setTimeout(() => {
        dispatch({ type: TOGGLE_CART });
        setIsClosing(false);
      }, 300);
    } else {
      console.log('Opening the cart...');
      dispatch({ type: TOGGLE_CART });
    }
  }, [state.cartOpen, dispatch]);

  const handleCartIconClick = () => {
    console.log('Cart icon clicked');
    setIsCartIconClicked(true);
  };

  useEffect(() => {
    if (isCartIconClicked) {
      toggleCart();
      setIsCartIconClicked(false);
    }
  }, [isCartIconClicked, toggleCart]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, photos: [...cart] });
    }
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  useEffect(() => {
    let cartCloseTimer = null;

    function handleMouseMovement(event) {
      clearTimeout(cartCloseTimer);
      cartCloseTimer = setTimeout(() => {
        if (!isMouseInsideCart(event)) {
          toggleCart();
        }
      }, 100000000);
    }
    
    function handleMouseClickOutside(event) {
      const cartElement = document.querySelector('.cart');
      const closeIconElement = event.target.closest('.close');

      if (state.cartOpen) {
        if (closeIconElement) {
          toggleCart();
        } else {
          if (!cartElement?.contains(event.target)) {
            toggleCart();
          }
        }
      }
    }

    function isMouseInsideCart(event) {
      const cartElement = document.querySelector('.cart');
      return cartElement?.contains(event?.target);
    }

    if (state.cartOpen) {
      cartCloseTimer = setTimeout(() => {
        if (!isMouseInsideCart()) {
          toggleCart();
        }
      }, 100000000);
    } else {
      return;
    }

    window.addEventListener('mousemove', handleMouseMovement);
    window.addEventListener('click', handleMouseClickOutside);

    return () => {
      clearTimeout(cartCloseTimer);
      cartCloseTimer = null;
      window.removeEventListener('mousemove', handleMouseMovement);
      window.removeEventListener('click', handleMouseClickOutside);
    };
  }, [state.cartOpen, toggleCart]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      if (item && item.price && item.quantity) {
        let price = Number(item.price);
        let quantity = Number(item.quantity);
        if (isNaN(price) || isNaN(quantity)) {
          console.error('price or purchaseQuantity is not a valid number', item);
        } else {
          sum += price * quantity;
        }
      }
    });
    return sum.toFixed(2);
  }
  function submitCheckout() {
    const products = state.cart.map(item => {
      return {
        _id: item._id,
        name: item.title,
        quantity: Number(item.quantity),
        price: Number(item.price),
        size: item.size,
      };
    });
  
    checkoutMutation({
      variables: { products },
    }).then(response => {
      console.log('Checkout response:', response);
  
      // After successful checkout, redirect the user to make the payment using Stripe
      if (response && response.data && response.data.checkout && response.data.checkout.id) {
        const sessionId = response.data.checkout.id;
  
        stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId });
        });
      } else {
        console.error('Error: SessionId not available in the response.');
      }
    }).catch(error => {
      console.error('Error during checkout', error);
    });
  }
  if (state.cartOpen) {
    return (
      <div>
        <Tooltip title="Shopping Cart">
          <IconButton className="linkText" onClick={handleCartIconClick}>
            <Badge badgeContent={state.cart.length} color="error">
              <ShoppingCartIcon style={{ fontSize: 26 }} />
            </Badge>
          </IconButton>
        </Tooltip>
        <div className={`cart ${isClosing ? 'cart-closing' : ''}`}>
          <div
            className="close"
            onClick={(e) => e.stopPropagation()}
            style={{ top: '1%', left: '90%' }}>
            <FontAwesomeIcon
              icon={faClose}
              color="#EFD81D"
              style={{
                height: '1em',
                width: '1em',
                color: '#5b77a1',
              }}
              onClick={toggleCart}
            />
          </div>

          <h2>Shopping Cart</h2>
          {state.cart.length ? (
            <div>
              {state.cart.map((item, index) => {
                if (!item) {
                  console.error(`Item at index ${index} is undefined`);
                  return null;
                } else if ([item._id, item.size]) {
                  return <CartItem key={[item._id, item.size]} item={item} />;
                } else {
                  console.error(
                    `Item at index ${index} is missing required properties`
                  );
                  return null;
                }
              })}
              <div className="flex-row space-between">
                <strong className="totalPrice">
                  Total: ${calculateTotal()}
                </strong>

                <div>
                  <button
                    className="checkOutBtn"
                    style={{
                      color: 'white',
                      backgroundColor: '#fca43c',
                      borderRadius: '20px',
                    }}
                    onClick={submitCheckout}>
                    Checkout
                  </button>
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
      </div>
    );
  }

  return (
    <Tooltip title="Shopping Cart">
      <IconButton
        className="cart-closed linkText"
        onClick={handleCartIconClick}>
        <Badge badgeContent={state.cart.length} color="error">
          <ShoppingCartIcon style={{ fontSize: 26 }} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default Cart;
