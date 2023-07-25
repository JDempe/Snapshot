import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet';
import './style.scss';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const [failed, setFailed] = useState(false); // this is the error message that will be displayed on the page

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
      setFailed(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [emailError, setEmailError] = useState(false);
  const [emailReady, setEmailReady] = useState(false);
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
  const [passwordHelper, setPasswordHelper] = useState(true);
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
      <Helmet>
        <title>Log in | Snapshot</title>
      </Helmet>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            multiline
            onChange={handleChangeEmail}
            error={emailError}
          />
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
            onFocus={() => setPasswordHelper(true)}
            error={passwordError}
          />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!emailReady || !passwordReady}
            sx={{ mt: 3, mb: 2 }}>
            Log In
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
              Incorrect Credentials! Please try again.
            </Alert>
          </Collapse>
          <Grid container justifyContent="center">
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
