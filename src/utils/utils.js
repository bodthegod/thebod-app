import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_total: profile.followers_total - 1,
        following_id: null,
      }
    : profile.is_owner
    ? { ...profile, following_total: profile.following_total - 1 }
    : profile;
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_total: profile.followers_total + 1,
        following_id,
      }
    : profile.is_owner
    ? { ...profile, following_total: profile.following_total + 1 }
    : profile;
};


/*
  Sets token timestamp in local storage
  Accepts the data object given by API on login
  decodes refresh token
*/
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/*
  Indicates if users token needs a refresh
  Returns the refreshTokenTimestamp value from local storage
  Token is refreshed only for a logged in user
*/
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/*
  Removes value from local storage if logout is needed
  /refresh token expires
*/
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};