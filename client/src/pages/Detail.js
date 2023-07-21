import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PHOTOS,
} from '../utils/actions';
import { QUERY_PHOTOS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import Rating from '@mui/material/Rating';
import Auth from '../utils/auth';

import './Detail.scss';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PHOTOS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PHOTOS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PHOTOS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  function showCommentInput() {
    if (Auth.loggedIn()) {
      return (
        <>
          <div className="commentInput">Logged in</div>
        </>
      );
    } else {
      return (
        <>
          <div className="commentInput">Not logged in</div>
        </>
      );
    }
  }

  return (
    <>
      {currentProduct && cart ? (
        <div className="my-1">
          <div className="backdrop">
            <Link to="/">← Return</Link>
            <div className="imageContainer">
              <img
                src={`/images/${currentProduct.image}`}
                alt={currentProduct.name}
              />
            </div>
          </div>
          <div className="contentContainer">
            <div className=" my-1 imageInfo">
              <img
                src="https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png"
                className="avatar"
              />
              <div className="imageTitleWrap">
                <h2 className="imageName">{currentProduct.name}</h2>
                <p style={{ paddingTop: '0.6rem', fontSize: '0.9rem' }}>
                  Uploaded: DATE
                </p>
              </div>
              <p className="imageAuthor">
                by{' '}
                <Link style={{ color: '#549cf1', fontWeight: 'bold' }}>
                  Image Author
                </Link>
              </p>
              <div className="imageDescription">
                <p>{currentProduct.description}</p>
              </div>
              <div className=" my-1 purchaseContainer">
                <strong>Price:</strong>${currentProduct.price}{' '}
                <button onClick={addToCart}>Add to Cart</button>
                <button
                  disabled={!cart.find((p) => p._id === currentProduct._id)}
                  onClick={removeFromCart}>
                  Remove from Cart
                </button>
              </div>
            </div>
            <div className="commentSection">
              <hr />
              <h5 style={{ marginBottom: '1.2rem' }}>#VALUE comments</h5>
              <div className="comment">
                <div className="commentOrientation">
                  <img
                    src="https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png"
                    className="avatarCommentor"
                  />
                  <div className="commentContent">
                    <div className="nameRating">
                      <p className="commentAuthor">
                        <Link style={{ color: '#2e3547', fontWeight: 'bold' }}>
                          Commentor
                        </Link>
                      </p>
                      <Rating name="read-only" value={0} readOnly />
                    </div>
                    {/* <div className="imageDescription">
                        <p>Insert the comment</p>
                      </div> */}
                  </div>
                </div>
                <div className="commentText">
                  <p style={{ marginBottom: '0.3rem' }}>Insert the comment</p>
                </div>
                <div className="commentDate">
                  <p>Posted: </p>
                </div>
              </div>
            </div>
            <div>{showCommentInput()}</div>
          </div>
          <div className="otherPhotos">
            <hr style={{ width: '75%' }} />
            <h5>Check out these other photos</h5>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;

// function Detail() {
//   const [state, dispatch] = useStoreContext();
//   const { id } = useParams();

//   const [currentProduct, setCurrentProduct] = useState({});

//   const { loading, data } = useQuery(QUERY_PRODUCTS);

//   const { products, cart } = state;

//   useEffect(() => {
//     // already in global store
//     if (products.length) {
//       setCurrentProduct(products.find((product) => product._id === id));
//     }
//     // retrieved from server
//     else if (data) {
//       dispatch({
//         type: UPDATE_PRODUCTS,
//         products: data.products,
//       });

//       data.products.forEach((product) => {
//         idbPromise('products', 'put', product);
//       });
//     }
//     // get cache from idb
//     else if (!loading) {
//       idbPromise('products', 'get').then((indexedProducts) => {
//         dispatch({
//           type: UPDATE_PRODUCTS,
//           products: indexedProducts,
//         });
//       });
//     }
//   }, [products, data, loading, dispatch, id]);

//   const addToCart = () => {
//     const itemInCart = cart.find((cartItem) => cartItem._id === id);
//     if (itemInCart) {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: id,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
//       });
//       idbPromise('cart', 'put', {
//         ...itemInCart,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
//       });
//     } else {
//       dispatch({
//         type: ADD_TO_CART,
//         product: { ...currentProduct, purchaseQuantity: 1 },
//       });
//       idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
//     }
//   };

//   const removeFromCart = () => {
//     dispatch({
//       type: REMOVE_FROM_CART,
//       _id: currentProduct._id,
//     });

//     idbPromise('cart', 'delete', { ...currentProduct });
//   };

//   return (
//     <>
//       {currentProduct && cart ? (
//         <div className="container my-1">
//           <Link to="/">← Back to Products</Link>

//           <h2>{currentProduct.name}</h2>

//           <p>{currentProduct.description}</p>

//           <p>
//             <strong>Price:</strong>${currentProduct.price}{' '}
//             <button onClick={addToCart}>Add to Cart</button>
//             <button
//               disabled={!cart.find((p) => p._id === currentProduct._id)}
//               onClick={removeFromCart}
//             >
//               Remove from Cart
//             </button>
//           </p>

//           <img
//             src={`/images/${currentProduct.image}`}
//             alt={currentProduct.name}
//           />
//         </div>
//       ) : null}
//       {loading ? <img src={spinner} alt="loading" /> : null}
//       <Cart />
//     </>
//   );
// }

// export default Detail;
