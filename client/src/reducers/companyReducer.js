import {
  GET_COMPANIES,
  ADD_COMPANY,
  DELETE_COMPANY,
  COMPANIES_LOADING,
} from "../actions/types";
//   import { IAction, IItem } from '../../types/interfaces';

const initialState = {
  companies: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        loading: false,
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company._id !== action.payload
        ),
      };
    case ADD_COMPANY:
      return {
        ...state,
        companies: [action.payload, ...state.companies],
      };
    case COMPANIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
