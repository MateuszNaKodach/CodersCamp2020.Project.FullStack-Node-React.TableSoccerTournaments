import React from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const clientId =
  "1052788207529-fjnskiqrsm09i9kbujp3gmtasnp21su7.apps.googleusercontent.com";

export function Login() {
  const history = useHistory();

  const onSuccess = (res: any) => {
    // console.log("Login Success: currentUser:", res.profileObj);
    console.log("Login Success: res:tokenId", res.tokenId);

    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    const cookies = new Cookies();
    cookies.set("googleTokenId", res.tokenId);
    history.push("/home");
    refreshTokenSetup(res);
  };

  const onFailure = (res: any) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. 😢`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Zaloguj się za pomocą Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

const refreshTokenSetup = (res: any) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log("newAuthRes:", newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem("authToken", newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};
