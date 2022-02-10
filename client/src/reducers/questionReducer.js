import {
  GET_QUESTIONS,
  GET_QUESTION,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";
//   import { IAction, IItem } from '../../types/interfaces';

const initialState = {
  questions: [],
  question: null,
  questionVar: null,
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
    case GET_QUESTION:
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
        // questions: [action.payload, ...state.questions.comments],
        // question: [action.payload.questions, ...state.questions],
        question: { comments: payload, ...state.question },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        question: { comments: payload, ...state.question },
        // comments: state.comments.filter(
        //   (comment) => comment._id !== action.payload
        // ),
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
