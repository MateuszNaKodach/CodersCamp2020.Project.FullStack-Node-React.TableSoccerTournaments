import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export function Logout(): JSX.Element {
  const history = useHistory();

  const onSuccess = () => {
    console.log("Logout made successfully");
    alert("Logout made successfully ✌");
    history.push("/");
    const cookies = new Cookies();
    cookies.remove('googleTokenId');
  };

  if(!clientId){
    return <div/>;
  }

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
