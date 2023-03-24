import { useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history.push("/all-posts");
        }
      } catch (err) {
        if (err.response) {
          alert(err.response?.data);
        } else {
          alert({ non_field_errors: [String(err)] });
        }
        if (userAuthStatus === "loggedOut") {
          history.push("/all-posts");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};