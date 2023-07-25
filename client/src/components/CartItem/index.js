import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const [state, dispatch] = useStoreContext();
  // fprce the cart item to rerender when the quantity changes

  useEffect(() => {
    if (item.quantity === 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
        size: item.size,
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      idbPromise('cart', 'put', { ...item });
    }
  }, [item, dispatch]);

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
      size: item.size,
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
        size: item.size,
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        size: item.size,
        quantity: parseInt(value),
      });
      idbPromise('cart', 'put', { ...item, quantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        {/* photo display */}
        <img src={item.url} alt="" />
      </div>
      <div>
        {/* display size and price */}
        <div>
          {item.size}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          {/* display quantity */}
          <input
            type="number"
            placeholder="1"
            value={item.quantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}>
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
