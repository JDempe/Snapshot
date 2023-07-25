import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import PublicIcon from '@mui/icons-material/Public';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
              <Link to="/signup">
                <Button className="signupButtonHome">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="homeContainer">
        <div className="pitchContainer">
          <PublicIcon className="pitchIcon" />
          <ShareIcon className="pitchIconSecond" />
          <div className="pitchTitle">Share with the world</div>
          <div className="pitchText">This is the text</div>
        </div>
        <div className="pitchContainer">
          <AddReactionIcon className="pitchIcon" />
          <FavoriteBorderIcon className="pitchIconSecond" />
          <div className="pitchTitle">Find your favorites</div>
          <div className="pitchText">This is the text</div>
        </div>
        <div className="pitchContainer">
          <ShoppingCartIcon className="pitchIcon" />
          <PriceCheckIcon className="pitchIconSecond" />

          <div className="pitchTitle">Like it? Buy it</div>
          <div className="pitchText">This is the text</div>
        </div>
        <div className="pitchContainer">
          <SellIcon className="pitchIcon" />
          <MonetizationOnIcon className="pitchIconSecond" />
          <div className="pitchTitle">This is the title</div>
          <div className="pitchText">This is the text</div>
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
