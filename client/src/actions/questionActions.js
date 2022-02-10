import axios from "axios";
import {
  GET_QUESTIONS,
  GET_QUESTION,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { setAlert } from "./alert";
// import { IItem } from '../../types/interfaces';

export const getQuestions = () => (dispatch) => {
  dispatch(setQuestionsLoading());
  axios
    .get("/api/questions")
    .then((res) =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const getQuestionByID = (id) => (dispatch) => {
  dispatch(setQuestionsLoading());
  axios
    .get(`/api/questions/${id}`)
    .then((res) =>
      dispatch({
        type: GET_QUESTION,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addQuestion = (question) => (dispatch, getState) => {
  axios
    .post("/api/question", question, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: ADD_QUESTION,
          payload: res.data,
        }),
      dispatch(setAlert(`Posted Question Successfully!!`, "success"))
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addComment = (postId, formData) => (dispatch, getState) => {
  axios
    .post(`/api/comment/${postId}`, formData, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: ADD_COMMENT,
          payload: res.data,
        }),

      dispatch(setAlert(`Posted Comment Successfully!!`, "success"))
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteQuestion = (id) => (dispatch, getState) => {
  axios
    .delete(`/deleteQuestion/${id}`, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: DELETE_QUESTION,
          payload: id,
        }),
      dispatch(setAlert(`Deleted Question Successfully!!`, "success"))
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteComment = (id, comment_id) => (dispatch, getState) => {
  axios
    .delete(`/api/comment/${id}/${comment_id}`, tokenConfig(getState))
    .then(
      (res) =>
        dispatch({
          type: DELETE_COMMENT,
          payload: comment_id,
        }),
      dispatch(setAlert(`Deleted Comment Successfully!!`, "success"))
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setQuestionsLoading = () => {
  return {
    type: QUESTIONS_LOADING,
  };
};

// export const getItems = () => (dispatch: Function) => {
//   dispatch(setItemsLoading());
//   axios
//     .get('/api/items')
//     .then(res =>
//       dispatch({
//         type: GET_ITEMS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

// export const addItem = (item: IItem) => (
//   dispatch: Function,
//   getState: Function
// ) => {
//   axios
//     .post('/api/items', item, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: ADD_ITEM,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

// export const deleteItem = (id: string) => (
//   dispatch: Function,
//   getState: Function
// ) => {
//   axios
//     .delete(`/api/items/${id}`, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: DELETE_ITEM,
//         payload: id
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

// export const setItemsLoading = () => {
//   return {
//     type: ITEMS_LOADING
//   };
// };
