import React from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import LoginOrSignupSwitch from '../components/LoginOrSignupSwitch';

const Authentication = (props) => {
  return (
    <div className="container" sx={{ width: 1 }}>
      <LoginOrSignupSwitch mode={props.mode} />
      {/* depending on the URL, show Login or Signup */}
      {props.mode === 'login' ? <Login /> : <Signup />}
    </div>
  );
};

export default Authentication;
