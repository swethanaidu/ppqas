import axios from "axios";
import {
  GET_COMPANIES,
  ADD_COMPANY,
  DELETE_COMPANY,
  COMPANIES_LOADING,
  COMPANY_ADD_FAIL,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { setAlert } from "./alert";
// import { IItem } from '../../types/interfaces';

export const getCompanies = () => (dispatch) => {
  dispatch(setCompaniesLoading());
  axios
    .get("/api/company")
    .then((res) =>
      dispatch({
        type: GET_COMPANIES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCompany = (company) => (dispatch, getState) => {
  axios
    .post("/api/company", company, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: ADD_COMPANY,
          payload: res.data,
        }),
      dispatch(setAlert(`Added Company Successfully!!`, "success"))
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "COMPANY_ADD_FAIL")
      )
    );
  dispatch({
    type: COMPANY_ADD_FAIL,
  });
};

export const deleteCompany = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/company/${id}`, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: DELETE_COMPANY,
          payload: id,
        }),
      dispatch(setAlert(`Delete Company Successfully!!`, "success"))
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCompaniesLoading = () => {
  return {
    type: COMPANIES_LOADING,
  };
};
