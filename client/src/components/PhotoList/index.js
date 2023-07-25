import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import spinner from '../../assets/spinner.gif';
import { Box } from '@mui/material';
import { Masonry } from '@mui/lab';
import './index.scss';

function PhotoList({ photos }) {
  return (
    <Box sx={{ width: 1, minHeight: 400, marginTop: 10, marginBottom: 10 }}>
      {photos.length ? (
        <Masonry columns={3} spacing={1}>
          {/* Display the photos using different heights based on the heights array */}
          {photos.map((photo) => (
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
    </Box>
  );
}

export default PhotoList;
