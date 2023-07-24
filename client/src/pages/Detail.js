import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PHOTOS,
} from '../utils/actions';
import { QUERY_ALL_PHOTOS, QUERY_USER } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import Rating from '@mui/material/Rating';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import WestIcon from '@mui/icons-material/West';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Auth from '../utils/auth';

import './Detail.scss';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentPhoto, setCurrentPhoto] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_PHOTOS);

  const photosList = data?.photos || [];

  const { photos, cart } = state;

  // displaying other photos at bottom of page
  const otherPhotosLimit = 4;
  const otherPhotos = data
    ? data.photos.filter((photo) => photo._id !== id).slice(0, otherPhotosLimit)
    : [];

  const navigateOtherPhoto = (photoId) => {
    navigate(`/products/${photoId}`);
  };

  useEffect(() => {
    // already in global store
    if (photos.length) {
      setCurrentPhoto(photos.find((photos) => photos._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PHOTOS,
        photos: data.photos,
      });

      data.photos.forEach((photo) => {
        idbPromise('photos', 'put', photo);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('photos', 'get').then((indexedPhotos) => {
        dispatch({
          type: UPDATE_PHOTOS,
          photos: indexedPhotos,
        });
      });
    }
  }, [photos, data, loading, dispatch, id]);

  const addToCart = () => {
    console.log('addToCart function called');

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
        photo: {
          ...currentPhoto,
          purchaseQuantity: 1,
          price: Number(currentPhoto.price),
        },
      });
      idbPromise('cart', 'put', {
        ...currentPhoto,
        purchaseQuantity: 1,
        price: Number(currentPhoto.price),
      });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentPhoto._id,
    });

    idbPromise('cart', 'delete', { ...currentPhoto });
  };

  // function commentBox() {
  //   const [comment, setComment] = useState('');

  //   const handleInputChange = (event) => {
  //     setComment(event.target.value);
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     console.log('Submitted comment:', comment);
  //     setComment('');
  //   };

  // const showCommentInput = () => {
  //   if (Auth.loggedIn()) {
  //     return (
  //       <>
  //         <form onSubmit={handleSubmit}>
  //           <textarea
  //             rows="4"
  //             cols="50"
  //             placeholder="Enter your comment..."
  //             value={comment}
  //             onChange={handleInputChange}
  //           />
  //           <button type="submit">Submit</button>
  //         </form>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <div className="commentInput">Log in to comment</div>
  //       </>
  //     );
  //   }

  // };

  const showCommentInput = () => {
    if (Auth.loggedIn()) {
      return (
        <>
          <div>
            <form>
              <textarea
                className="commentInput"
                placeholder="Enter your comment..."
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h4 style={{ textAlign: 'center' }}>Log in to comment</h4>
        </>
      );
    }
  };

  const navigate = useNavigate();

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // random photo navigation
  const photoIds = data ? data.photos.map((photo) => photo._id) : [];

  const navigateToRandomPhoto = () => {
    if (photoIds.length === 0) {
      return;
    }
    const randomPhotoId = photoIds[Math.floor(Math.random() * photoIds.length)];

    navigate(`/products/${randomPhotoId}`);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const closeFullscreen = () => {
      setIsFullscreen(false);
    };

    if (isFullscreen) {
      const darkOverlayDiv = document.createElement('div');
      darkOverlayDiv.classList.add('darkOverlay');

      darkOverlayDiv.addEventListener('click', closeFullscreen);

      document.body.insertAdjacentElement('afterend', darkOverlayDiv);
    } else {
      const darkOverlayDiv = document.querySelector('.darkOverlay');
      if (darkOverlayDiv) {
        darkOverlayDiv.remove();
      }
    }

    return () => {
      const darkOverlayDiv = document.querySelector('.darkOverlay');
      if (darkOverlayDiv) {
        darkOverlayDiv.removeEventListener('click', closeFullscreen);
        darkOverlayDiv.remove();
      }
    };
  }, [isFullscreen]);

  return (
    <>
      {currentPhoto && cart ? (
        <div className="my-1">
          <div className="backdrop">
            <div className="backdropContainer">
              <div className="iconColumn">
                <Link
                  to="/"
                  className={`arrowLink ${isFullscreen ? 'hideElement' : ''}`}>
                  <WestIcon fontSize="inherit" color="inherit" />
                </Link>
                <div
                  className={`arrowLink ${isFullscreen ? 'hideElement' : ''}`}>
                  <ArrowBackIosNewIcon
                    fontSize="inherit"
                    color="inherit"
                    onClick={() => navigateToRandomPhoto()}
                  />
                </div>
              </div>
              <div
                className={`imageContainer ${
                  isFullscreen ? 'fullscreenImage' : ''
                }`}>
                <img src={`${currentPhoto.url}`} alt={currentPhoto.title} />
              </div>
              <div className="iconColumn">
                {!isFullscreen && (
                  <OpenInFullIcon
                    fontSize="1.9rem"
                    color="inherit"
                    onClick={toggleFullscreen}
                    className={`arrowLink`}
                  />
                )}
                <div
                  className={`arrowLink ${isFullscreen ? 'hideElement' : ''}`}>
                  <ArrowForwardIosIcon
                    fontSize="inherit"
                    color="inherit"
                    onClick={() => navigateToRandomPhoto()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="contentContainer">
            <div className="imageInfo">
              <img
                src="https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png"
                className="avatar"
              />
              <div className="imageTitleWrap">
                <h2 className="imageName">{currentPhoto.title}</h2>
                <div className="socialContainer">
                  <div className="socialText">{currentPhoto.likes}</div>
                  <FavoriteBorderIcon
                    style={{ fontSize: '2rem' }}
                    color="inherit"
                  />
                </div>
              </div>
              <p className="imageAuthor">
                by{' '}
                <Link style={{ color: '#549cf1', fontWeight: 'bold' }}>
                <span>
              <span>{currentPhoto && currentPhoto.createdBy ? currentPhoto.createdBy.username : 'Loading...'}</span>
              </span>
                {/* <p>{currentPhoto && currentPhoto.createdBy ? currentPhoto.createdBy.username : 'Loading...'}</p> */}
                </Link>
              </p>
              <div className="imageDescription">
                <p>{currentPhoto.description}</p>
              </div>
              <div className="bottomRow">
                <div>Uploaded: DATE</div>
                <div className=" my-1 purchaseContainer">
                  <strong>Price:</strong>${currentPhoto.price}{' '}
                  <button onClick={addToCart}>Add to Cart</button>
                  <button
                    disabled={!cart.find((p) => p._id === currentPhoto._id)}
                    onClick={removeFromCart}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="commentSection">
              <hr />
              <div>{showCommentInput()}</div>
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
          </div>
          {otherPhotos.length > 0 && (
            <div className="otherPhotos">
              <hr style={{ width: '75%' }} />
              <h5 style={{ padding: '1rem 0 1.1rem 0' }}>
                Check out these other photos
              </h5>
              <div className="otherPhotosContainer">
              {otherPhotos.map((photo) => (
              <div className="otherPhotoBarrier" key={photo._id}>
                <div className="otherPhoto">
              <img
               src={photo.url}
               alt={photo.title}
              className="otherPhoto"
               onClick={() => navigateOtherPhoto(photo._id)}
              />
          </div>
               </div>
              ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
