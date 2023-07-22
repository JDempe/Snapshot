import React from 'react';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './index.scss';

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  function showLoginOptions() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              <Button variant="outlined" className="orderButton">
                Order History
              </Button>
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              <Button variant="outlined" className="logoutButton">
                Log Out
              </Button>
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row alignRight">
          <li className="mx-1">
            <Link to="/login">
              <Button variant="outlined" className="loginButton">
                Log In
              </Button>
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">
              <Button className="signupButton">Sign Up</Button>
            </Link>
          </li>
        </ul>
      );
    }
  }

  function showPersonalTab() {
    // if logged in, show the Personal tab
    if (Auth.loggedIn()) {
      return (
        <Link to="/personal">
          <div className="linkText">Personal</div>
        </Link>
      );
    }
  }

  function showUploadTab() {
    // if logged in, show the Upload tab
    if (Auth.loggedIn()) {
      return (
        // if currently at /upload, navigate -1, else navigate to /upload
        <div onClick={checkIfUploadIsOpen()}>
          <div className="linkText">Upload</div>
        </div>
      );
    }
  }

  // if current at /upload, return navigate -1, else return /upload
  const checkIfUploadIsOpen = () => {
    if (location.pathname === '/upload') {
      return navigate(-1);
    } else {
      return navigate('/upload');
    }
  };

  return (
    <header className="flex-row">
      <div className="titleLinks">
        <Link to="/">
          <h1 className="websiteTitle">websiteTitle</h1>
        </Link>
        <div className="verticalDivider"></div>
        <Link to="/discover">
          <div className="linkText">Discover</div>
        </Link>
        {showPersonalTab()}
        {showUploadTab()}
        <Link to="/ContactUs">
          <div className="linkText">ContactUs</div>
        </Link>
        <Outlet />
      </div>
      <Cart />
      <div>{showLoginOptions()}</div>

      <div className="rainbowContainer">
        <div
          className="rainbowDiv"
          style={{ backgroundColor: '#FF5858', width: '100%' }}
        />
        <div
          className="rainbowDiv"
          style={{ backgroundColor: '#FCA43C', width: '75%' }}
        />
        <div
          className="rainbowDiv"
          style={{ backgroundColor: '#FBCD29', width: '60%' }}
        />
        <div
          className="rainbowDiv"
          style={{ backgroundColor: '#82CD54', width: '50%' }}
        />
        <div
          className="rainbowDiv"
          style={{ backgroundColor: '#549CF1', width: '25%' }}
        />
      </div>
    </header>
  );
}

export default Nav;
