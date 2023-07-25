import React from 'react';
import Quantity from '../Quantity/Quantity.js';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import LandscapeIcon from '@mui/icons-material/Landscape';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

function ProductDropdownCard(size) {
  return (
    <div
      className="dropdownItemContainer"
      data-price={size.price}
      data-size={size.size}>
      <div className="dropdownItem">
        <CropOriginalIcon className="photoIcon" />
        <div className="size">{size.size} inches</div>
        <div className="price">${size.price}</div>
      </div>
      <hr
        style={{
          paddingBottom: '1px',
          margin: '5px',
          width: '85%',
          height: '1px',
        }}
      />
      <div className="quantityText">Quantity</div>
      <Quantity />
    </div>
  );
}

export default ProductDropdownCard;
