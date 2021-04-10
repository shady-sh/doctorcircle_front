import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/moduels/action";
import { useTranslation } from "react-i18next";
import { authHeader } from "../../services/auth-header";
import axios from "axios";
import { LOGIN_SUCCESS } from "../../store/moduels/types";
import authService from "../../services/auth.service";
import useWindowDimensions from "../../components/WindowDimension";

const accountSave = JSON.parse(localStorage.getItem("accountSave"));

// 로그인 페이지 (경로: /Login)
const Login = ({ location, history, match }, props) => {
  const [authType] = useState("email");
  const [email, setEmail] = useState(accountSave ? accountSave.email : "");
  const [password, setPassword] = useState(
    accountSave ? accountSave.password : ""
  );
  const [check, setCheck] = useState(accountSave ? true : false);
  const [loading, setLoading] = useState(false);
  const [loginFailedMsg, setLoginFailedMsg] = useState(false);

  const { height } = useWindowDimensions();

  const { isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSilentRefresh = async () => {
    const user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    const { refreshToken, refreshTokenExpireAt } = user;
    const data = { refreshToken };
    axios
      .post("/api/oauth/token", data, authHeader)
      .then((res) => {
        const {
          accessToken,
          accessTokenCurrentAt,
          accessTokenExpireAt,
        } = res.data;
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
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: res.data,
          },
        });
      })
      .catch((err) => {
        authService.logoutWithoutAlert();
      });
  };

  const handleLogin = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    const body = { authType, identifier: email, key: password };
    dispatch(login(body))
      .then(() => {
        setTimeout(onSilentRefresh, 10000);
        history.push("/");
        window.location.reload();
      })
      .catch(async () => {
        setLoading(false);
        setLoginFailedMsg(true);
        setTimeout(() => {
          setLoginFailedMsg(false);
        }, 1000);
      });
  };

  const saveAccount = () => {
    localStorage.setItem("accountSave", JSON.stringify({ email, password }));
    setCheck(true);
  };

  const removeSavedAccount = () => {
    localStorage.removeItem("accountSave");
    setCheck(false);
  };

  const loginFailed = () => {
    if (loginFailedMsg) {
      if (!email || !password) {
        return <p>{t("login_noInformation")}</p>;
      } else {
        return <p>{loginFailedMsg ? t("login_invalidAccount") : null}</p>;
      }
    }
  };
  // <p>{loginFailedMsg ? t("login_invalidAccount") : null}</p>;
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div
      id="wrapper"
      style={{ marginBottom: height >= 1166 && `${height - 1165}px` }}
    >
      <div className="login">
        <div className="center">
          <a
            href="/"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              history.push("/");
            }}
          >
            <img src="/img/logo.png" />
          </a>
          <div className="title">{t("login_title")}</div>
          <div className="textBox">
            <div
              className="text01"
              dangerouslySetInnerHTML={{ __html: t("login_text01") }}
            ></div>
            <div className="text02">{t("login_text02")}</div>
          </div>
          <ul className="formBox">
            <li>
              <div className="inputBox">
                <input
                  type="text"
                  id="id"
                  placeholder="ID (Email)"
                  value={email}
                  onChange={onChangeEmail}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </li>
            <li>
              <div className="inputBox">
                <input
                  type="password"
                  id="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={onChangePassword}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </li>
            <div className="option">
              <input
                type="checkbox"
                id="IDPW저장"
                checked={check}
                onChange={check == false ? saveAccount : removeSavedAccount}
              />
              <label htmlFor="IDPW저장">{t("login_remember")}</label>
              {loginFailed()}
              {/* <p>{loginFailedMsg ? t("login_invalidAccount") : null}</p> */}
            </div>
            <a href="" className="bottomBtn" onClick={handleLogin}>
              {t("login_title")}
            </a>
          </ul>
          <div className="otherLink">
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                history.push("/finduserid");
              }}
            >
              {t("login_findID")}
            </a>{" "}
            &nbsp; | &nbsp;{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                history.push("/finduserpassword");
              }}
            >
              {t("login_findPW")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
