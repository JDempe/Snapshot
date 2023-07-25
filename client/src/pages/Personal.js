import React from 'react';
import PhotoList from '../components/PhotoList';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_USER_PHOTOS } from '../utils/actions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Personal.scss';

const Personal = () => {
  const { id } = useParams(); // Get the user id from the url

  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: id },
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_USER_PHOTOS,
        photos: data.user.savedPhotos,
      });
      data.user.savedPhotos.forEach((photo) => {
        idbPromise('userPhotos', 'put', photo);
      });
    } else if (!loading) {
      idbPromise('userPhotos', 'get').then((photos) => {
        dispatch({
          type: UPDATE_USER_PHOTOS,
          photos: photos,
        });
      });
    }
  }, [data, loading, dispatch]);

  console.log(data);
  console.log(state);

  // await the loading then display data

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="contentAlign">
        <div className="personal">
          <Avatar sx={{ width: 96, height: 96 }}>
            <img src={state.user.profilePicture} alt="profilePicture"></img>
          </Avatar>
          <h3>{state.user.username}</h3>
          <p>
            {state.user.firstName} {state.user.lastName}
          </p>
        </div>
        <hr style={{ width: '75vw', margin: '0px 0px 5px 0px' }} />
        <div
          className="container"
          sx={{ width: 1 }}
          style={{ position: 'relative' }}>
          <Box
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            className="tabs">
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Uploads" className="tabText" />
              <Tab label="Likes" className="tabText" />
            </Tabs>
          </Box>
          {value === 0 && <PhotoList photos={state.user.savedPhotos} />}
          {value === 1 && <PhotoList photos={state.user.likedPhotos} />}
        </div>
      </div>
    </>
  );
};

export default Personal;
