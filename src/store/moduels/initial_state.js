const user = JSON.parse(localStorage.getItem("user"));
const language = localStorage.getItem("language");
const save = JSON.parse(localStorage.getItem("save"));

export const message_initialState = {};

export const cert_initialState = { cert: false };
export const verifyCode_initialState = { verifyCode: null };
export const verifyPhoneNumber_initialState = { verifyPhoneNumber: null };
export const isMatch_initialState = { match: false };

export const login_initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const language_initialState = language
  ? { language }
  : { language: "KR" };

export const conference_initialState = { conference: { conferenceId: null } };

// 각각 리듀서들의 초기값을 설정해줍니다.
