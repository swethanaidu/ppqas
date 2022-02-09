import { combineReducers } from "redux";
import questionReducer from "./questionReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import userReducer from "./userReducer";
import alert from "./alert";

export default combineReducers({
  alert,
  user: userReducer,
  company: companyReducer,
  question: questionReducer,
  error: errorReducer,
  auth: authReducer,
});
