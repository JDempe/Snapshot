import React, { useState, useEffect } from 'react';
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
import { Helmet } from 'react-helmet';
import './Home.scss';

function Home() {
  const [isBlurbContainerVisible, setBlurbContainerVisible] = useState(false);

  useEffect(() => {
    setBlurbContainerVisible(true);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Snapshot: How it Works</title>
      </Helmet>
      <div className="bannerContainer">
        <div className="banner">
          <div
            className={`blurbContainer ${
              isBlurbContainerVisible ? 'slide-in' : ''
            }`}>
            <div className="blurb">
              <div className="blurbTitle">Welcome to Snapshot</div>
              <div className="blurbText">
                Start sharing your pictures with the world around you. Join a{' '}
                <br></br>
                growing community of photographers and enthusiasts.
              </div>
              <Link to="/signup">
                <Button className="signupButtonHome">Sign Up</Button>
              </Link>
              {/* <div className="rainbowSlideContainer">
                <div
                  className="rainbowSlideDiv"
                  style={{ backgroundColor: '#FF5858', width: '20%' }}
                />
                <div
                  className="rainbowSlideDiv"
                  style={{ backgroundColor: '#FCA43C', width: '20%' }}
                />
                <div
                  className="rainbowSlideDiv"
                  style={{ backgroundColor: '#FBCD29', width: '20%' }}
                />
                <div
                  className="rainbowSlideDiv"
                  style={{ backgroundColor: '#82CD54', width: '20%' }}
                />
                <div
                  className="rainbowSlideDiv"
                  style={{ backgroundColor: '#549CF1', width: '20%' }}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="titleContainer">
        <hr className="titleHr" />
        <span className="homeTitle">How it works</span>
        <hr className="titleHr" />
      </div>
      <div className="homeContainer">
        <div className="pitchContainer">
          <PublicIcon className="pitchIcon" />
          <ShareIcon className="pitchIconSecond" />
          <div className="pitchTitle">Share with the world</div>
          <div className="pitchText">
            Join a diverse community of creators from across the world. With so
            many different creators, you will get to experience many different
            styles, meet new people, and see the world from a different
            perspective
          </div>
        </div>
        <div className="pitchContainer">
          <AddReactionIcon className="pitchIcon" />
          <FavoriteBorderIcon className="pitchIconSecond" />
          <div className="pitchTitle">Find your favorites</div>
          <div className="pitchText">
            While you're out exploring what Snapshot has to offer, you'll
            encounter many creators with capitvating works. Give their works a
            like and they'll be saved to your likes tab on your personal page.
          </div>
        </div>
        <div className="pitchContainer">
          <ShoppingCartIcon className="pitchIcon" />
          <PriceCheckIcon className="pitchIconSecond" />

          <div className="pitchTitle">Like it? Buy it</div>
          <div className="pitchText">
            When you come across the kind of photo you just have to have, the
            kind you want to frame, just click the purchase prints button and
            add the desired sizes and quantity to your cart. Checkout is easy
            and simple.
          </div>
        </div>
        <div className="pitchContainer">
          <SellIcon className="pitchIcon" />
          <MonetizationOnIcon className="pitchIconSecond" />
          <div className="pitchTitle">Sell your work</div>
          <div className="pitchText">
            Any photo you upload can be sold as prints. Don't worry about the
            details when it comes to printing, we got it covered on our end.
            We'll handle the order processing and ship out the prints when
            they're ready to go.
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
