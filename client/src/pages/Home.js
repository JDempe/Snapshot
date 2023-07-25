import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import './Home.scss';

function Home() {
  return (
    <div>
      <div className="bannerContainer">
        <div className="banner">
          <div className="blurbContainer">
            <div className="blurb">
              <div className="blurbTitle">Welcome to Snapshot</div>
              <div className="blurbText">
                Start sharing your pictures with the world around you.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <Box sx={{ width: 1, minHeight: 400, marginTop: 10, marginBottom: 10 }}>
    // <Card sx={{ display: 'flex' }}>
    //     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //     <CardContent sx={{ flex: '1 0 auto' }}>
    //         <Typography component="div" variant="h5">
    //         Welcome to Photo Share!
    //         </Typography>
    //         <Typography variant="subtitle1" color="text.secondary" component="div">
    //         <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to get started.
    //         </Typography>
    //     </CardContent>
    //     </Box>
    //     <CardMedia
    //     component="img"
    //     sx={{ width: 160 }}
    //     image="https://source.unsplash.com/random"
    //     alt="Random"
    //     />
    // </Card>
    // </Box>
  );
}

export default Home;
