import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import './style.scss';

function ProductItem(item) {
  const navigate = useNavigate();

  const { url, createdBy, title, _id, likes } = item;

  const handleImageClick = () => {
    navigate(`/photos/${_id}`);
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
