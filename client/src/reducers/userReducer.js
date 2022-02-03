import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING,
  JUNIOR_REGISTER_FAIL,
  GET_JUNIOR_USERS,
  CONVERT_JUNIOR_USERS,
} from "../actions/types";
//   import { IAction, IItem } from '../../types/interfaces';

const initialState = {
  users: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
    case GET_JUNIOR_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case CONVERT_JUNIOR_USERS:
      return {
        ...state,
        // users: action.payload,
        // loading: false,
        //users: state.users.filter((user) => user._id !== action.payload),
        users: state.users.map((user) =>
          user._id === action.payload ? { ...user } : user
        ),
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case JUNIOR_REGISTER_FAIL:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
