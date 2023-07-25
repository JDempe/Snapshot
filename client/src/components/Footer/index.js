import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { GitHub } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import './style.scss';
import { LinkRounded } from '@mui/icons-material/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKiwiBird, faOtter } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const footerTitleText = {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '1.2em',
    color: '#5b77a1',
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: '2% 5%',
        // position: 'sticky',
        // bottom: '0vh',
      }}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                style={{
                  ...footerTitleText,
                  display: 'flex',
                  alignItems: 'center',
                }}
                variant="h6"
                color="text.primary"
                gutterBottom>
                <FontAwesomeIcon icon={faOtter} />
                &nbsp;ABOUT US
              </Typography>
              <Typography className="footerDefText">
                Welcome to Snapshot - your virtual gallery at home. Explore
                diverse, high-quality photos, and share your collection with
                fellow art enthusiasts through an easy sign-up. Join now and
                cherish life's moments with us.{' '}
              </Typography>
              <div className="footerTextPadding">
                <br />
                {/* <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText contact-us">
                  contact us
                </a> */}
                <Link to="/ContactUs" className="footerText contact-us">
                  <Button
                    // to="/contact"
                    // target="_blank"
                    // rel="noopener noreferrer"
                    variant="outlined"
                    // className="footerText contact-us"
                    style={{
                      fontFamily: 'Montserrat',
                      fontWeight: 600,
                      color: '#5b77a1',
                      border: 'solid 1px #5b77a1',
                      fontSize: '80%',
                    }}>
                    Contact Us
                  </Button>
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                style={{
                  ...footerTitleText,
                  display: 'flex',
                  alignItems: 'center',
                }}
                variant="h6"
                color="text.primary"
                gutterBottom>
                <LinkRounded style={{ transform: 'rotate(135deg)' }} />
                TECHNOLOGY
              </Typography>
              <div className="footerTextPadding">
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  React
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://mui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Material UI
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://www.apollographql.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Apollo GraphQL
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://stripe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Stripe
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://www.mongodb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  MongoDB
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                style={{
                  ...footerTitleText,
                  display: 'flex',
                  alignItems: 'center',
                }}
                variant="h6"
                color="text.primary"
                gutterBottom>
                <LinkRounded style={{ transform: 'rotate(135deg)' }} />
                (CONT.)
              </Typography>
              <div className="footerTextPadding">
                <a
                  href="https://cloudinary.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Cloudinary
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://fontawesome.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Font Awesome
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://day.js.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Day.js
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://animate.style"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Animate.css
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://jwt.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  JSON Web Tokens
                </a>
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={2}>
              <Typography
                style={footerTitleText}
                variant="h6"
                color="text.primary"
                gutterBottom>
                CONTACT US
              </Typography>
            </Grid> */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                style={{
                  ...footerTitleText,
                  display: 'flex',
                  alignItems: 'center',
                }}
                variant="h6"
                color="text.primary"
                gutterBottom>
                FOLLOW US ON&nbsp;&nbsp;
                {/* <div className="footerTextPadding"> */}
                <a
                  href="https://github.com/JDempe/project3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerIcon">
                  <GitHub className="GitHub" />
                </a>
                {/* </div> */}
              </Typography>
              <div className="footerTextPadding">
                <a
                  href="https://github.com/JDempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  JDempe
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://github.com/jenryt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  jenryt
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://github.com/bbandhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  bbandhu
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://github.com/Kevrev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  Kevrev
                </a>
              </div>
              <div className="footerTextPadding">
                <a
                  href="https://github.com/hichamraffiaidrissi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerText">
                  hichamraffiaidrissi
                </a>
              </div>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link
                color="inherit"
                // href=""
                to="/"
                className="copyright">
                Snapshot{' '}
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
