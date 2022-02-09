import {
  GET_COMPANIES,
  ADD_COMPANY,
  DELETE_COMPANY,
  COMPANIES_LOADING,
} from "../actions/types";

const initialState = {
  companies: [],
  loading: false,
  message: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        loading: false,
        message: "",
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company._id !== action.payload
        ),
        message: "",
      };
    case ADD_COMPANY:
      return {
        ...state,
        companies: [action.payload, ...state.companies],
        message: "Form Submitted",
      };
    case COMPANIES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };
    default:
      return state;
  }
}
