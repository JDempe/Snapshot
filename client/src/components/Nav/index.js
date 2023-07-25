import React from 'react';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import AccountMenu from '../AccountMenu';
import { Link, useLocation, Outlet, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './style.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Logo from '../../assets/logo.png';

function Nav() {
  const location = useLocation();

  const label = { inputProps: { 'aria-label': 'theme-switch' } };

  function showLoginOptions() {
    if (Auth.loggedIn()) {
      return <AccountMenu />;
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
        <NavLink
          id="uploadLink"
          // make the link go to /upload if it isnt, and navigate -1 if it isnt
          to="/upload"
          end
          state={{ previousLocation: location }}>
          {({ isActive, isPending }) => (
            <div className={isActive ? 'active linkText' : 'linkText'}>
              {/* upload icon */}
              <FileUploadIcon style={{ fontSize: 32 }} />
            </div>
          )}
        </NavLink>
      );
    }
  }

  function showShoppingCart() {
    // if logged in, show the cart button
    if (Auth.loggedIn()) {
      return <Cart />;
    }
  }

  // const handleTheme = () => {
  //   document.body.classList.toggle('dark-mode');
  // };

  return (
    <header className="flex-row">
      <div className="titleLinks">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
          {/* 
          <h1 className="websiteTitle">websiteTitle</h1> */}
        </Link>
        <div className="verticalDivider"></div>
        <Link to="/discover">
          <div className="linkText">Discover</div>
        </Link>
        {showPersonalTab()}
      </div>

      <div className="titleLinks">
        {showUploadTab()}
        <Outlet />

        {showShoppingCart()}
        {/* <Switch {...label} onChange={handleTheme}/> */}
        {showLoginOptions()}
      </div>

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
