import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import './style.scss';

function Signup(props) {
  const [failed, setFailed] = useState(false); // this is the error message t

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          username: formState.username,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;

      Auth.login(token);
      localStorage.setItem('user_id', mutationResponse.data.addUser.user._id);
    } catch (e) {
      console.log(e);
      setFailed(true);
    }
  };

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameReady, setFirstNameReady] = useState(false);
  const handleChangeFirstName = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setFirstNameError(false);
      setFirstNameReady(false);
    } else if (value.length < 1) {
      setFirstNameError(true);
      setFirstNameReady(false);
    } else {
      setFirstNameError(false);
      setFirstNameReady(true);
    }
  };

  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameReady, setLastNameReady] = useState(false);
  const handleChangeLastName = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setLastNameError(false);
      setLastNameReady(false);
    } else if (value.length < 1) {
      setLastNameError(true);
      setLastNameReady(false);
    } else {
      setLastNameError(false);
      setLastNameReady(true);
    }
  };

  const [usernameError, setUsernameError] = useState(false);
  const [usernameReady, setUsernameReady] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState(false);
  const handleChangeUsername = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setUsernameError(false);
      setUsernameReady(false);
    } else if (value.length < 5) {
      setUsernameError(true);
      setUsernameReady(false);
    } else {
      setUsernameError(false);
      setUsernameReady(true);
    }
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
    } else if (value.length < 5) {
      setEmailError(true);
      setEmailReady(false);
    } else {
      setEmailError(false);
      setEmailReady(true);
    }
  };

  const [passwordError, setPasswordError] = useState(false);
  const [passwordReady, setPasswordReady] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState(false);
  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setPasswordError(false);
      setPasswordReady(false);
    } else if (value.length < 5) {
      setPasswordError(true);
      setPasswordReady(false);
    } else {
      setPasswordError(false);
      setPasswordReady(true);
    }
  };

  return (
    <Container component="main" maxWidth="s">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <FormControl
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                inputProps={{ minLength: 1, maxLength: 16 }}
                id="firstName"
                label="First Name"
                onChange={handleChangeFirstName}
                error={firstNameError}
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                inputProps={{ minLength: 1, maxLength: 16 }}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleChangeLastName}
                error={lastNameError}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputProps={{ minLength: 5, maxLength: 30 }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
                error={emailError}
                multiline
                onFocus={() => setEmailHelper(true)}
                onBlur={() => setEmailHelper(false)}
              />
              <Collapse in={emailHelper}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Please enter a valid email address.
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputProps={{ minLength: 5, maxLength: 30 }}
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChangeUsername}
                error={usernameError}
                multiline
                onFocus={() => setUsernameHelper(true)}
                onBlur={() => setUsernameHelper(false)}
              />
              <Collapse in={usernameHelper}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Username must be at least 5 characters long.
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputProps={{ minLength: 1, maxLength: 128 }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChangePassword}
                error={passwordError}
                onFocus={() => setPasswordHelper(true)}
                onBlur={() => setPasswordHelper(false)}
              />
              <Collapse in={passwordHelper}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Password must be at least 5 characters long, contain at least
                  1 number, and contain at least 1 special character.
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              !firstNameReady ||
              !lastNameReady ||
              !usernameReady ||
              !emailReady ||
              !passwordReady
            }
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Collapse in={failed}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setFailed(false);
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              Something went wrong! Please try again.
            </Alert>
          </Collapse>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
}

export default Signup;
