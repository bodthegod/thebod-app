import { useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  /*
    Checks if the user is currently logged in or not
    If logged in, refresh token
    Sends user to home page if logged in and out
    "/" page has different view for loggedIn
    and loggedOut
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};