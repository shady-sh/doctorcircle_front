import i18n from "i18next";
import {
  cert_initialState,
  verifyCode_initialState,
  verifyPhoneNumber_initialState,
  isMatch_initialState,
  language_initialState,
  login_initialState,
  message_initialState,
  conference_initialState,
} from "./initial_state";
import {
  CHANGE_LANGUAGE,
  CLEAR_MESSAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_CERT,
  SET_VERIFY_CODE,
  SET_VERIFY_PHONE_NUMBER,
  IS_MATCH,
  SET_CONFERENCE,
} from "./types";

// 액션 타입에 따라 리듀서가 값을 반환해줍니다.

export const counter = (state = language_initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.language.toLowerCase());
      localStorage.setItem("language", action.language);
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export const msg = (state = message_initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };
    case CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
};

export const cert = (state = cert_initialState, action) => {
  switch (action.type) {
    case SET_CERT:
      return { ...state, cert: action.cert };
    default:
      return state;
  }
};

export const verifyCode = (state = verifyCode_initialState, action) => {
  switch (action.type) {
    case SET_VERIFY_CODE:
      return { ...state, verifyCode: action.verifyCode };
    default:
      return state;
  }
};

export const verifyPhoneNumber = (
  state = verifyPhoneNumber_initialState,
  action
) => {
  switch (action.type) {
    case SET_VERIFY_PHONE_NUMBER:
      return { ...state, verifyPhoneNumber: action.phoneNumber };
    default:
      return state;
  }
};

export const isMatch = (state = isMatch_initialState, action) => {
  switch (action.type) {
    case IS_MATCH:
      return { ...state, match: action.match };
    default:
      return state;
  }
};

export const conference = (state = conference_initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CONFERENCE:
      return { ...state, conference: payload };
    default:
      return state;
  }
};

export const login = (state = login_initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
