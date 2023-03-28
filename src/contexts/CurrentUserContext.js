import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import axios from "axios";
import {
  getCookie,
  removeTokenTimestamp,
  shouldRefreshPage,
  shouldRefreshToken,
} from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  /*
    handleMount function that logs user
    out if their authentication token
    cookie has expired, request of user
    data when component is mounted
  */
  const handleMount = async () => {
    try {
      if (getCookie("refreshTokenTimestamp") === "") {
        await axios.post("dj-rest-auth/logout/");
      }
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  /* 
    Handles user authentication tokens
    If refresh token fails, redirect to
    log in page
  */
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshPage(config.data)) {
          window.location.reload();
        } else {
          if (shouldRefreshToken()) {
            try {
              await axios.post("/dj-rest-auth/token/refresh/");
            } catch (err) {
              setCurrentUser((prevCurrentUser) => {
                if (prevCurrentUser) {
                  history.push("/login");
                }
                return null;
              });
              removeTokenTimestamp();
              return config;
            }
          }
          return config;
        }
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    /*
      Refreshes access_token if 401 error
      This request on IOS is returning a 401,
      which causes the catch block to hit and 
      then wont login
    */
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
