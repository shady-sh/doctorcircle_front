import axios from "axios";
import i18next from "i18next";

// Redux-thunk 미들웨어를 통한 API 통신 비동기 작업으로 로그인 및 로그아웃 처리가 가능합니다.

const login = sendBody => {
  return axios.post("/api/oauth", sendBody).then(response => {
    if (response.data.accessToken) {
      alert(i18next.t("login_success"));
      const {
        accessToken,
        accessTokenCurrentAt,
        accessTokenExpireAt,
        refreshToken,
        refreshTokenExpireAt,
      } = response.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken,
          accessTokenCurrentAt,
          accessTokenExpireAt,
          refreshToken,
          refreshTokenExpireAt,
        })
      );
    } else {
      alert(i18next.t("login_notToken"));
    }

    return response.data;
  });
};

const logout = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
    alert(i18next.t("logout"));
  }
  window.location.href = "/";
};

const logoutWithoutAlert = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
  window.location.href = "/";
};

export default {
  login,
  logout,
  logoutWithoutAlert,
};
