import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { IconButton, Button, TextField, Box } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import './index.scss';
// stop
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
    console.log('onChange what is state.cart', state.cart);
    const value = e.target.value;
    console.log('onChange what is value', value);
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
        quantity: value,
      });
      idbPromise('cart', 'put', { ...item, quantity: value });
      console.log('onChange what is state.cart at the end', state.cart);

      // update the value of the item in the cart
    }
  };

  return (
    <div className="flex-row perItem">
      <div className="itemImgBox">
        {/* photo display */}
        <img src={item.url} alt="" className="itemImg" />
      </div>
      <div className="itemInfo">
        {/* display size and price */}
        <div
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            paddingBottom: '.5em',
          }}>
          {item.size}, ${item.price}
        </div>

        <div>
          <Box style={{ display: 'flex', alignItem: 'flex-start' }}>
            <TextField
              className="qtyField"
              variant="outlined"
              id="outlined-number"
              label="QTY"
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {
                  height: '.5em',
                  padding: '8px',
                  margin: '0px',
                  fontFamily: 'Montserrat',
                }, // Adjust the height and padding
              }}
            />
            {/* <span>Qty:</span> */}
            {/* display quantity */}
            {/* <input
            type="number"
            placeholder="1"
            value={item.quantity}
            onChange={onChange}
          /> */}
            <Button
              className="removeItem"
              style={{ height: '1.5em', padding: '0' }}
              onClick={() => removeFromCart(item)}>
              <DeleteOutline
                onClick={() => removeFromCart(item)}
                style={{ color: '#5b77a1' }}
              />
            </Button>

            {/* <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}>
            🗑️
          </span> */}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
