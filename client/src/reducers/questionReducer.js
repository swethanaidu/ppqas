import {
    GET_QUESTIONS,
    ADD_QUESTION,
    DELETE_QUESTION,
    QUESTIONS_LOADING
  } from '../actions/types';
//   import { IAction, IItem } from '../../types/interfaces';

  const initialState = {
    questions: [],
    loading: false
  };
  
//   interface IState {
//     questions: IItem[];
//   }
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_QUESTIONS:
        return {
          ...state,
          questions: action.payload,
          loading: false
        };
      case DELETE_QUESTION:
        return {
          ...state,
          questions: state.questions.filter(question => question._id !== action.payload)
        };
      case ADD_QUESTION:
        return {
          ...state,
          questions: [action.payload, ...state.questions]
        };
      case QUESTIONS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }