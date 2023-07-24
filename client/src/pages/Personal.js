import React from 'react';
import PhotoList from '../components/PhotoList';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import './Personal.scss';

const Personal = () => {
  Auth.loggedIn() ? console.log('logged in') : console.log('not logged in');

  const userId = Auth.getProfile().data._id; // Get the user id from the Auth.getProfile() function

  console.log('id:', userId); // Log the id

  // use the QUERY_USER GetUser query to get the user data for the logged in user
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: userId },
  });

  console.log(data);

  const user = data?.user || {};

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="contentAlign">
        <div className="personal">
          <Avatar sx={{ width: 96, height: 96 }}>
            <img src={user.profilePicture} alt="profilePicture"></img>
          </Avatar>
          <h3>{user.username}</h3>
          <p>
            {user.firstName} {user.lastName}
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
          {value === 0 && <PhotoList />}
          {value === 1 && <PhotoList />}
        </div>
      </div>
    </>
  );
};

export default Personal;
