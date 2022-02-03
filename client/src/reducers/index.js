import { combineReducers } from "redux";
import questionReducer from "./questionReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import userReducer from "./userReducer";

export default combineReducers({
  user: userReducer,
  company: companyReducer,
  question: questionReducer,
  error: errorReducer,
  auth: authReducer,
});
