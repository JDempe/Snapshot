import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  styled,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@mui/material';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

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
    <div className="container my-1">
      <div
        className="w-50"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {/* <Link to="/signup">← Go to Signup</Link> */}

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

        <h2>Login</h2>
        <p>No account? Switch to sign up!</p>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email address:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex-row" style={{ justifyContent: 'center' }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;