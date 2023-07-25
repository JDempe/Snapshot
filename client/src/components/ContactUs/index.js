import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Button,
  Alert,
  Collapse,
  IconButton,
  FormControl,
  collapseClasses,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './index.scss';

function ContactForm() {
  const [failed, setFailed] = useState(false); // this is the error message

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { name, email, message } = formState;

  const [nameError, setNameError] = useState(false);
  const [nameReady, setNameReady] = useState(false);
  const handleChangeName = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setNameError(false);
      setNameReady(false);
    } else if (value.length < 1) {
      setNameError(true);
      setNameReady(false);
    } else {
      setNameError(false);
      setNameReady(true);
    }
    console.log('nameReady:', nameReady);
  };

  const [emailError, setEmailError] = useState(false);
  const [emailReady, setEmailReady] = useState(false);
  const [emailHelper, setEmailHelper] = useState(false);
  const handleChangeEmail = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setEmailError(false);
      setEmailReady(false);
    } else if (value.length < 1) {
      setEmailError(true);
      setEmailReady(false);
    } else {
      setEmailError(false);
      setEmailReady(true);
    }
  };

  const [messageError, setMessageError] = useState(false);
  const [messageReady, setMessageReady] = useState(false);
  const handleChangeMessage = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setMessageError(false);
      setMessageReady(false);
    } else if (value.length < 1) {
      setMessageError(true);
      setMessageReady(false);
    } else {
      setMessageError(false);
      setMessageReady(true);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (nameReady && emailReady && messageReady) {
      setFeedbackMessage(
        'Thank you for contacting us, we will get back to you soon!'
      );
      setFormState({
        name: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setFeedbackMessage('');
      }, 5000);
    } else {
      setErrorMessage('Please fill out all the required fields.');
    }
  }

  return (
    <Container component="main" maxWidth="s">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <h2 style={{ fontFamily: 'Montserrat', color: '#5b77a1' }}>
          CONTACT US
        </h2>
        <FormControl component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                multiline
                onChange={handleChangeName}
                error={nameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                inputProps={{ minLength: 5, maxLength: 30 }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                multiline
                onChange={handleChangeEmail}
                error={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                multiline
                rows={10}
                onChange={handleChangeMessage}
                error={messageError}
              />
            </Grid>
          </Grid>
          <Collapse in={feedbackMessage !== ''}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setFeedbackMessage('');
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              {feedbackMessage}
            </Alert>
          </Collapse>
          <Button
            fullWidth
            variant="contained"
            disabled={!nameReady || !emailReady || !messageReady}
            sx={{ mt: 2, mb: 2 }}
            onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}

export default ContactForm;
