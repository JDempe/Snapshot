import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_CURRENT_PHOTO,
} from '../utils/actions';
import { QUERY_SINGLE_PHOTO } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import PhotoComment from '../components/PhotoComment';
import ProductDropdownCard from '../components/ProductDropdownCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import WestIcon from '@mui/icons-material/West';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Quantity from '../components/Quantity/Quantity.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Auth from '../utils/auth';
import dayjs from 'dayjs';
import './Detail.scss';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [comment, setComment] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [iconState, setIconState] = useState('down');

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const { loading, data } = useQuery(QUERY_SINGLE_PHOTO, {
    variables: { id: id },
  });

  const { photos, cart } = state;

  const photoIds = photos ? photos.map((photo) => photo._id) : [];
  console.log('photoIds: ', photoIds);

  // save the single photo in data to state
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_CURRENT_PHOTO,
        photo: data.photo,
      });
    } else if (!loading) {
      idbPromise('photos', 'get').then((photos) => {
        dispatch({
          type: UPDATE_CURRENT_PHOTO,
          photo: photos.find((photo) => photo._id === id),
        });
      });
    }
  }, [data, loading, dispatch, id]);

  const { currentPhoto } = state;

  console.log('currentPhoto: ', currentPhoto);

  // displaying other photos at bottom of page
  const otherPhotosLimit = 4;
  const otherPhotos = [];

  const navigateOtherPhoto = (photoId) => {
    navigate(`/photos/${photoId}`);
  };

  //   useEffect(() => {
  //  if (data) {
  //       dispatch({
  //         type: UPDATE_PHOTOS,
  //         photos: data.photos,
  //       });

  //       data.photos.forEach((photo) => {
  //         idbPromise('photos', 'put', photo);
  //       });
  //     }
  //     // get cache from idb
  //     else if (!loading) {
  //       idbPromise('photos', 'get').then((indexedPhotos) => {
  //         dispatch({
  //           type: UPDATE_PHOTOS,
  //           photos: indexedPhotos,
  //         });
  //       });
  //     }
  //   }, [photos, data, loading, dispatch, id]);

  // function to take all the comments and make them into a list using the PhotoComment component
  const commentList = (comments) => {
    if (comments) {
      return comments.map((comment) => (
        <PhotoComment comment={comment} key={comment._id} />
      ));
    }
  };

  const sizeList = (sizes) => {
    if (sizes) {
      return sizes.map((size) => (
        <ProductDropdownCard
          size={size.size}
          price={size.currentPrice}
          key={size._id}
        />
      ));
    }
  };

  const addToCart = () => {
    console.log('addToCart function called');

    // for each of the sizes, add to cart using the size and price and quantity from the dropdown cards (div's in the dropdownContainer class div, children are ProductDropdownCard's)
    const dropdownContainer = document.querySelector('.dropdownContainer');
    const dropdownCards = dropdownContainer.children;
    for (let i = 0; i < dropdownCards.length; i++) {
      const dropdownCard = dropdownCards[i];
      const size = dropdownCard.dataset.size;
      const price = dropdownCard.dataset.price;
      // grab the quantity from the input that is a grandchild of the dropdownCard
      const quantity = dropdownCard.querySelector('input').value;
      console.log('size: ', size);
      console.log('price: ', price);
      console.log('quantity: ', quantity);
      // if quantity is greater than 0, add to cart
      if (quantity > 0) {
        dispatch({
          type: ADD_TO_CART,
          photo: {
            ...currentPhoto,
            size: size,
            price: price,
            quantity: quantity,
          },
        });
        idbPromise('cart', 'put', {
          ...currentPhoto,
          size: size,
          price: price,
          quantity: quantity,
        });
      }
    }
  };

  // function to handle the button click on click
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = addComment({
        variables: {
          photoId: id,
          commentText: comment,
        },
      });
      setComment('');

      // GET currentPhoto from state again to get the updated comments array
      const { currentPhoto } = state;
      console.log('currentPhoto: ', currentPhoto);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const showCommentInput = () => {
    if (Auth.loggedIn()) {
      return (
        <>
          <div>
            <form>
              <textarea
                className="commentInput"
                placeholder="Enter your comment..."
                onChange={handleCommentChange}
                value={comment}
              />
              <button
                onClick={handleCommentSubmit}
                className="commentButton"
                disabled={comment.length < 5}>
                Comment
              </button>
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

  const navigateTo = (path) => {
    navigate(path);
  };

  const showPurchaseButton = () => {
    if (Auth.loggedIn()) {
      return (
        <>
          <Button
            className={`purchaseButton ${
              dropdownVisible ? 'purchaseInactive' : ''
            }`}
            onClick={toggleDropdown}>
            Purchase a print
            {iconState === 'down' ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            className="purchaseButton"
            onClick={() => navigateTo('/login')}>
            Log In to Purchase
          </Button>
        </>
      );
    }
  };

  const navigate = useNavigate();

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // random photo navigation

  const navigateToRandomPhoto = () => {
    if (photoIds.length === 0) {
      return;
    }
    const randomPhotoId = photoIds[Math.floor(Math.random() * photoIds.length)];

    navigate(`/photos/${randomPhotoId}`);
  };

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

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
    setIconState((prevIconState) => (prevIconState === 'down' ? 'up' : 'down'));
  };

  const location = useLocation();
  useEffect(() => {
    setDropdownVisible(false);
    setIconState('down');
  }, [location]);

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
                src={
                  currentPhoto && currentPhoto.createdBy
                    ? currentPhoto.createdBy.profilePicture
                    : '../images/avatars/Blank-Avatar.png'
                }
                className="avatar"
                alt="avatar"
              />
              <div className="imageTitleWrap">
                <h2 className="imageName">{currentPhoto.title}</h2>
                <hr className="socialDivider" />
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
                    <span>
                      {currentPhoto && currentPhoto.createdBy
                        ? currentPhoto.createdBy.username
                        : 'Loading...'}
                    </span>
                  </span>
                  {/* <p>{currentPhoto && currentPhoto.createdBy ? currentPhoto.createdBy.username : 'Loading...'}</p> */}
                </Link>
              </p>
              <div className="imageDescription">
                <p style={{ marginBottom: '5px' }}>
                  {currentPhoto.description}
                </p>
              </div>

              <div className="imageDate">
                Uploaded:{' '}
                <span>
                  {dayjs
                    .unix(currentPhoto.createdAt / 1000)
                    .format('MMM DD YYYY h:mm A')}
                </span>
              </div>
              <div className="bottomRow">
                {/* <button onClick={addToCart}>Add to Cart</button>
                  <button
                    disabled={!cart.find((p) => p._id === data._id)}
                    onClick={removeFromCart}>
                    Remove from Cart
                  </button> */}
                <div>{showPurchaseButton()}</div>
              </div>
              {dropdownVisible && (
                <>
                  <div className="dropdownContainer">
                    {/*when the size array from currentPhoto is loaded, cycle through each and create a ProductDropdownCard */}
                    {currentPhoto && currentPhoto.sizes
                      ? sizeList(currentPhoto.sizes)
                      : 'Loading...'}
                  </div>
                  <div className="addCartContainer">
                    <Button className="addCart" onClick={addToCart}>
                      Add all to Cart
                      <ShoppingCartIcon />
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="commentSection">
              <hr />
              <div>{showCommentInput()}</div>
              <h5 style={{ marginBottom: '1.2rem' }}>
                {currentPhoto && currentPhoto.comments
                  ? currentPhoto.comments.length
                  : 'Loading...'}{' '}
                comments
              </h5>
              <div className="commentList">
                {commentList(currentPhoto.comments)}
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
