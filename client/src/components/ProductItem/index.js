import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import './style.scss';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();

  const { url, createdBy, title, _id, likes } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  const handleImageClick = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div className="card discover-photo">
      <img alt={title} src={`${url}`} onClick={handleImageClick} />
      <div className="overlay-container">
        <div className="createdBy discover-photo-top-overlay"></div>
        <div className="createdBy discover-photo-bottom-overlay">
          <div className="overlay-info">
            <div>{`${createdBy}`}</div>
            <div>{`${likes} likes`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
