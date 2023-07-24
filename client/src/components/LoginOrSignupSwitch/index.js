import React from 'react';
import { styled, Switch, FormGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { Typography, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import './style.scss';

const LoginOrSignupSwitch = (props) => {
  const [mode, setMode] = useState(props.mode);

  const handleModeChange = (event) => {
    setMode(event.target.checked ? 'login' : 'signup');

    if (mode === 'login') {
      window.location.href = '/signup';
    } else {
      window.location.href = '/login';
    }
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    fontSize: '100%',
    width: '150px',
    height: 40, // height of the whole toggle container
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
        transform: 'translateX(74px)', // switch thumb ending pt
        color: '#fff', // switch thumb color
        '& + .MuiSwitch-track': {
          backgroundColor: '#DC1E17', /////////////
        },
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: 20,
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
        left: 26,
      },
      '&:after': {
        content: '"Signup"',
        color: theme.palette.getContrastText(theme.palette.primary.main), // content(signup/login) color
        right: 50,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      borderRadius: 34 / 2,
      width: 70,
      height: 34,
      margin: 3,
    },
  }));

  return (
    <div className="authBanner">
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <FormGroup aria-label="auth toggle" style={{ width: 'fit-content' }}>
        <FormControlLabel
          control={
            <>
              <Typography variant="body2"></Typography>
              {/* links to /login if the mode is login and /signup if the mode is signup */}
              <Link>
                <AntSwitch
                  checked={mode === 'login'}
                  onClick={handleModeChange}
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
            width: 'fit-content',
            margin: '0',
          }}
        />
      </FormGroup>
    </div>
  );
};

export default LoginOrSignupSwitch;
