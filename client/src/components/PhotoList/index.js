import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PHOTOS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PHOTOS, QUERY_USER } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { Box } from '@mui/material';
import { Masonry } from '@mui/lab';
import './index.scss';

function PhotoList() {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_ALL_PHOTOS);

  console.log('requerying from PhotoList');
  console.log(data);

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
    <Box sx={{ width: 1, minHeight: 400, marginTop: 10, marginBottom: 10 }}>
      {state.photos.length ? (
        <Masonry columns={3} spacing={1}>
          {/* Display the photos using different heights based on the heights array */}
          {state.photos.map((photo) => (
            <ProductItem
              key={photo._id}
              _id={photo._id}
              url={photo.url}
              title={photo.title}
              description={photo.description}
              createdBy={photo.createdBy.username}
              likes={photo.likes}
            />
          ))}
        </Masonry>
      ) : (
        <h3>You haven't added any photos yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </Box>
  );
}

export default PhotoList;
