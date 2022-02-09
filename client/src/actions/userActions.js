import axios from "axios";
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING,
  JUNIOR_REGISTER_FAIL,
  GET_JUNIOR_USERS,
  CONVERT_JUNIOR_USERS,
  GET_USER_BY_ID,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { setAlert } from "./alert";

export const getAllUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/user")
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const getJuniorUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/user/role")
    .then((res) =>
      dispatch({
        type: GET_JUNIOR_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getUserByID = (id) => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get(`/api/user/${id}`)
    .then((res) =>
      dispatch({
        type: GET_USER_BY_ID,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addUser = (user) => (dispatch, getState) => {
  axios
    .post("/api/user", user, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: ADD_USER,
          payload: res.data,
        }),
      dispatch(setAlert(`Added Junior Profile Successfully!!`, "success"))
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "JUNIOR_REGISTER_FAIL"
        )
      );
      dispatch({
        type: JUNIOR_REGISTER_FAIL,
      });
    });
};

export const deleteUser = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/user/${id}`, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: DELETE_USER,
          payload: id,
        }),
      dispatch(setAlert(`Deleted User Profile Successfully!!`, "success"))
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const convertJrUser = (id) => (dispatch, getState) => {
  axios
    .put(`/api/user/${id}`, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: CONVERT_JUNIOR_USERS,
          payload: id,
        }),
      dispatch(
        setAlert(`Converted Junior to Senior Profile Successfully!!`, "success")
      )
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
