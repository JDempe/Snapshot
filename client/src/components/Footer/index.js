import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { GitHub } from '@mui/icons-material';
import { Box } from '@mui/material';
import './index.scss';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography className="footerDefText">
              We are XYZ company, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Technology
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
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              (cont.)
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
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
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
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <div className="footerTextPadding">
              <a
                href="https://github.com/JDempe/project3"
                target="_blank"
                rel="noopener noreferrer"
                className="footerIcon">
                <GitHub />
              </a>
            </div>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link
              color="inherit"
              href="https://your-website.com/"
              className="copyright">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
