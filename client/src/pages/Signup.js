import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import {
  styled,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@mui/material';

function Signup(props) {
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
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff', // toggle knob
        '& + .MuiSwitch-track': {
          opacity: 1,
          // theme color, need to be sync with the login.js
          backgroundColor:
            theme.palette.mode === 'dark' ? '#DC1E17' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,.35)'
          : 'rgba(255, 99, 71, 0.8)', // bgc for the toggle
      boxSizing: 'border-box',
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
        {/* <Link to="/login">← Go to Login</Link> */}

        <FormGroup aria-label="auth toggle" style={{ width: '30vw' }}>
          <FormControlLabel
            control={
              <>
                <Typography variant="body2">Log In</Typography>
                <AntSwitch
                  defaultChecked
                  checked={mode === 'login'}
                  onChange={handleModeChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'auth toggle' }}
                />
                <Typography variant="body2">Sign Up</Typography>
              </>
            }
            label=""
            labelPlacement="start"
            style={{ width: '100%', justifyContent: 'space-between' }}
          />
        </FormGroup>

        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First"
              name="firstName"
              type="text"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="Last"
              name="lastName"
              type="text"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="username">Username:</label>
            <input
              placeholder="Your username"
              name="username"
              type="text"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
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
          <div className="flex-row" style={{ justifyContent: 'center' }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
