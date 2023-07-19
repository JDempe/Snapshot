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
    padding: 8,
    fontSize: '80%',
    width: '100px',
    height: 25, // height of the whole toggle container
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(0px)', //switch thumb starting pt
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 0,
      '&.Mui-checked': {
        transform: 'translateX(45px)', //switch thumb ending pt
        color: '#fff',
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
        content: '"Login"', // Replace "-" with "Login"
        color: theme.palette.getContrastText(theme.palette.primary.main),
        left: 10,
      },
      '&:after': {
        content: '"Signup"', // Replace "-" with "Login"
        color: theme.palette.getContrastText(theme.palette.primary.main),
        right: 27,
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
        {/* <Link to="/login">← Go to Login</Link> */}

        <FormGroup aria-label="auth toggle" style={{ width: '11vw' }}>
          <FormControlLabel
            control={
              <>
                <Typography variant="body2"></Typography>
                <AntSwitch
                  defaultChecked
                  checked={mode === 'login'}
                  onChange={handleModeChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'auth toggle' }}
                />
                <Typography variant="body2"></Typography>
              </>
            }
            label=""
            labelPlacement="start"
            style={{
              width: '100%',
              justifyContent: 'space-between',
              marginLeft: '0',
            }}
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
