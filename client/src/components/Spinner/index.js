import React from 'react';
import './style.scss';

function Spinner({ children }) {
  return (
    <div align="center" class="cssload-fond">
      <div class="cssload-container-general">
        <div class="cssload-internal">
          <div class="cssload-ballcolor cssload-ball_1"> </div>
        </div>
        <div class="cssload-internal">
          <div class="cssload-ballcolor cssload-ball_2"> </div>
        </div>
        <div class="cssload-internal">
          <div class="cssload-ballcolor cssload-ball_3"> </div>
        </div>
        <div class="cssload-internal">
          <div class="cssload-ballcolor cssload-ball_4"> </div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
