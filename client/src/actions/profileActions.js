import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

//Get Crrent profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: err.response.data
      });
    });
};
//Create Profile
export const createProfile = (profile, history) => dispatch => {
  axios
    .post("/api/profile", profile)
    .then(res => {
      dispatch({ type: GET_ERRORS, payload: {} });
      history.push("/dashboard");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
//Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
//Add expeirence to profile
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => {
      history.push("/dashboard");
      dispatch({ type: GET_ERRORS, payload: {} });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Add education to profile
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => {
      history.push("/dashboard");
      dispatch({ type: GET_ERRORS, payload: {} });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/:${id}`)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//delete Account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? \nThis can't be undo")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  }
};
