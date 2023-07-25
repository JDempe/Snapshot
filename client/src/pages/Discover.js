import React from 'react';
import PhotoList from '../components/PhotoList';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PHOTOS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PHOTOS } from '../utils/actions';
import { useEffect } from 'react';

const Discover = () => {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_ALL_PHOTOS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PHOTOS,
        photos: data.photos,
      });
      data.photos.forEach((photo) => {
        idbPromise('photos', 'put', photo);
      });
    } else if (!loading) {
      idbPromise('photos', 'get').then((photos) => {
        dispatch({
          type: UPDATE_PHOTOS,
          photos: photos,
        });
      });
    }
  }, [data, loading, dispatch]);

  return (
    <div className="container" sx={{ width: 1 }}>
      <PhotoList photos={state.photos} />
    </div>
  );
};

export default Discover;
