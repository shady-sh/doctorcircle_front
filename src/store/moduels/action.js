import {
  CHANGE_LANGUAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  SET_CERT,
  SET_VERIFY_CODE,
  SET_VERIFY_PHONE_NUMBER,
  IS_MATCH,
  SET_CONFERENCE,
} from "./types";

import AuthService from "../../services/auth.service";

// Redux 액션 생성자 (Redux Action Creator)

export const changeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  language,
});

export const setConference = conference => ({
  type: SET_CONFERENCE,
  payload: conference,
});

export const setMessage = message => ({
  type: SET_MESSAGE,
  payload: message,
});

export const setCert = cert => ({
  type: SET_CERT,
  cert,
});

export const setVerifyCode = verifyCode => ({
  type: SET_VERIFY_CODE,
  verifyCode,
});

export const setVerifyPhoneNumber = phoneNumber => ({
  type: SET_VERIFY_PHONE_NUMBER,
  phoneNumber,
});

export const setMatch = match => ({
  type: IS_MATCH,
  match,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const onSilentRefresh = async user => {};

export const login = (type, email, password) => dispatch => {
  return AuthService.login(type, email, password).then(
    data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    error => {
      // console.log(error.response.data.data);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });
      // alert(error.response.data.data);
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => dispatch => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
