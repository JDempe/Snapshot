import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled, Switch, FormGroup } from '@mui/material';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const [failed, setFailed] = useState(false); // this is the error message that will be displayed on the page

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState.email);
      console.log(formState.password);
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;

      console.log(token);
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

  const [mode, setMode] = useState('signup');

  const handleModeChange = (event) => {
    const newMode = event.target.checked ? 'login' : 'signup';
    setMode(newMode);

    if (newMode === 'login') {
      window.location.href = '/login';
    } else {
      window.location.href = '/signup';
    }
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    fontSize: '80%',
    width: '100px',
    height: 25, // height of the whole toggle container
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(0px)', // switch thumb starting pt
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 0,
      '&.Mui-checked': {
        transform: 'translateX(45px)', // switch thumb ending pt
        color: '#fff', // switch thumb color
        '& + .MuiSwitch-track': {
          backgroundColor: '#DC1E17', /////////////
        },
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: 25 / 2,
      backgroundColor: '#177ddc', ////////////
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-65%)',
        width: 16,
        height: 16,
      },

      '&:before': {
        content: '"Login"',
        color: theme.palette.getContrastText(theme.palette.primary.main), // content(signup/login) color
        left: 10,
      },
      '&:after': {
        content: '"Signup"',
        color: theme.palette.getContrastText(theme.palette.primary.main), // content(signup/login) color
        right: 29,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      borderRadius: 21 / 2,
      width: 51,
      height: 21,
      margin: 2,
    },
  }));

  return (
    <Container component="main" maxWidth="s">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
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
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
              <FormGroup aria-label="auth toggle" style={{ width: '11vw' }}>
                <FormControlLabel
                  control={
                    <>
                      <Typography variant="body2"></Typography>
                      <Link to="/signup">
                        <AntSwitch
                          defaultChecked
                          checked={mode === 'signup'}
                          onChange={handleModeChange}
                          color="primary"
                          inputProps={{ 'aria-label': 'auth toggle' }}
                        />
                      </Link>
                      <Typography variant="body2"></Typography>
                    </>
                  }
                  label=""
                  labelPlacement="start"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    margin: '0',
                    flexDirection: 'column',
                  }}
                />
              </FormGroup>
            </Grid>

            <Grid item>
              <Link href="#" variant="body2">
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
