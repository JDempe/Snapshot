import React from 'react';
import Quantity from '../Quantity/Quantity.js';

function ProductDropdownCard(size) {
  return (
    <div
      className="dropdownItemContainer"
      data-price={size.price}
      data-size={size.size}>
      <div className="dropdownItem">
        {size.size} {size.price}
      </div>
      <hr style={{ margin: '2px', width: '85%', height: '1px' }} />
      <div className="quantityText">Quantity</div>
      <Quantity />
    </div>
  );
}

export default ProductDropdownCard;
