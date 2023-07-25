import React, { useEffect, useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
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
import { IconButton, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [isClosing, setIsClosing] = useState(false); // track cart closing
  const [isCartIconClicked, setIsCartIconClicked] = useState(false);

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

  state.cart.map((item) => {
    return <CartItem key={[item._id, item.size]} item={item} />;
  });

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
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.id }); // data.checkout.session vs data.checkout.id
      });
    }
  }, [data]);

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
      // Reset the timer whenever there is mouse movement inside the cart
      clearTimeout(cartCloseTimer);
      cartCloseTimer = setTimeout(() => {
        if (!isMouseInsideCart(event)) {
          toggleCart();
        }
      }, 10000);
    }

    function handleMouseClickOutside(event) {
      const cartElement = document.querySelector('.cart');
      const closeIconElement = event.target.closest('.close');

      if (state.cartOpen) {
        if (closeIconElement) {
          toggleCart();
        } else {
          if (!cartElement?.contains(event.target)) {
            // If the click is outside the cart and not on the close icon, close it
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
      // Start the timer when the cart is open
      cartCloseTimer = setTimeout(() => {
        if (!isMouseInsideCart()) {
          toggleCart();
        }
      }, 10000);
    } else {
      return;
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

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      if (item && item.price && item.quantity) {
        let price = Number(item.price);
        let quantity = Number(item.quantity);
        // console.log(
        //   'price',
        //   typeof price,
        //   price,
        //   'quantity',
        //   typeof quantity,
        //   quantity
        // );
        if (isNaN(price) || isNaN(quantity)) {
          console.error(
            'price or purchaseQuantity is not a valid number',
            item
          );
        } else {
          sum += price * quantity;
        }
      }
    });
    // console.log(sum);
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = state.cart.map((item) => [item._id, item.size]);

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (state.cartOpen) {
    return (
      <div>
        <IconButton className="linkText" onClick={handleCartIconClick}>
          <Badge badgeContent={state.cart.length} color="error">
            <ShoppingCartIcon style={{ fontSize: 26 }} />
          </Badge>
        </IconButton>
        <div className={`cart ${isClosing ? 'cart-closing' : ''}`}>
          <div className="close" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon
              icon={faClose}
              color="#EFD81D"
              style={{
                height: '7%',
                width: '7%',
                position: 'relative',
                right: '-92%',
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
      </div>
    );
  }

  return (
    <IconButton className="cart-closed linkText" onClick={handleCartIconClick}>
      <Badge badgeContent={state.cart.length} color="error">
        <ShoppingCartIcon style={{ fontSize: 26 }} />
      </Badge>
    </IconButton>
  );
};

export default Cart;
