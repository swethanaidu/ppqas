import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS, GET_SUCCESS_MSG } from "./types";
// import { IMsg } from '../../types/interfaces';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
