import {
  GET_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING,
  ADD_COMMENT,
} from "../actions/types";
//   import { IAction, IItem } from '../../types/interfaces';

const initialState = {
  questions: [],
  question: null,
  loading: false,
};

//   interface IState {
//     questions: IItem[];
//   }

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question._id !== action.payload
        ),
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };
    case ADD_COMMENT:
      return {
        ...state,
        question: { comments: payload, ...state.question },
      };
    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
