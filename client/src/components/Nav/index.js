import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './index.scss';

function Nav() {
  function showNavigation() {
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

  return (
    <header className="flex-row">
      <div className="titleLinks">
        <h1 className="websiteTitle">websiteTitle</h1>
        <div className="verticalDivider"></div>
        <Link to="/discover">
          <div className="linkText">Discover</div>
        </Link>
        <Link to="/upload">
          <div className="linkText">Upload</div>
        </Link>
        <Link to="/personal">
          <div className="linkText">Personal</div>
        </Link>
        <Link to="/ContactUs">
          <div className="linkText">ContactUs</div>
        </Link>
      </div>
      <nav>{showNavigation()}</nav>
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

// function Nav() {

//   function showNavigation() {
//     if (Auth.loggedIn()) {
//       return (
//         <ul className="flex-row">
//           <li className="mx-1">
//             <Link to="/orderHistory">
//               Order History
//             </Link>
//           </li>
//           <li className="mx-1">
//             {/* this is not using the Link component to logout or user and then refresh the application to the start */}
//             <a href="/" onClick={() => Auth.logout()}>
//               Logout
//             </a>
//           </li>
//         </ul>
//       );
//     } else {
//       return (
//         <ul className="flex-row">
//           <li className="mx-1">
//             <Link to="/signup">
//               Signup
//             </Link>
//           </li>
//           <li className="mx-1">
//             <Link to="/login">
//               Login
//             </Link>
//           </li>
//         </ul>
//       );
//     }
//   }

//   return (
//     <header className="flex-row px-1">
//       <h1>
//         <Link to="/">
//           <span role="img" aria-label="shopping bag">🛍️</span>
//           -Shop-Shop
//         </Link>
//       </h1>

//       <nav>
//         {showNavigation()}
//       </nav>
//     </header>
//   );
// }

export default Nav;
