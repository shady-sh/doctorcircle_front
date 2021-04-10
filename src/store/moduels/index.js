import { combineReducers } from "redux";
import {
  counter,
  login,
  msg,
  cert,
  verifyCode,
  verifyPhoneNumber,
  isMatch,
  conference,
} from "./reducer";

export const rootReducer = combineReducers({
  counter,
  login,
  msg,
  cert,
  verifyCode,
  verifyPhoneNumber,
  isMatch,
  conference,
  // 다른 리듀서를 만들게되면 여기에 넣어줌
});
