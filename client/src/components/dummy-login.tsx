/*
  this is a dummy component for google login
*/

import React from "react";
import { GoogleLogin } from "@react-oauth/google";

// import services
import handleSignInUp from "../services/handle-sign-in-up";

const DummyLogin = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleSignInUp(credentialResponse);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
};

export default DummyLogin;