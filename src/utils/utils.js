import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";
/*
  Get request to render and update all types of
  data for the InfiniteScroll component
  Sends a get request for the next page of results
  Removes any of the same posts already displayed 
  if new posts have been added after
*/
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
  } catch (err) {
    return err;
  }
};
/*
  Decreases the number of followers by one
  Decreate the number of following users by one
*/
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
/*
  Increases the number of followers by one
  Increases the number of following users by one
*/

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
  const token = getCookie("refreshTokenTimestamp");
  return !token
};

/*
  If axios request is made and profile_id of the post 
  is equal to the profile id that is signed in, reload
  the page as this indicates that the user has changed
  logged out cross tab
*/
export const shouldRefreshPage = (data) => {
  if(data) {
    const profileIdOfPost = data.profile_id
    const profileIdSignedIn = parseInt(getCookie("profile_id"))
    return profileIdOfPost === profileIdSignedIn
  }
  return false 
}

/*
  Removes value from local storage if logout is needed
  /refresh token expires
*/
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};


/*
  Helper function to retrieve cookie by name
*/
export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}