import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const clientId =
  "1052788207529-fjnskiqrsm09i9kbujp3gmtasnp21su7.apps.googleusercontent.com";

export function Logout() {
  const history = useHistory();

  const onSuccess = () => {
    console.log("Logout made successfully");
    alert("Logout made successfully ✌");
    history.push("/");
    const cookies = new Cookies();
    cookies.remove('googleTokenId');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
