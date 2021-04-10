import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import MyPage from "../../../components/MyPage";
import { phoneFomatter } from "../../../Formatter/PhoneFormatter";
import TabBox from "../../../components/TabBox";
import { PasswordPopup } from "../../../components/Popup";
import { useTranslation } from "react-i18next";
import { authHeader } from "../../../services/auth-header";
import Header from "../../../components/Header";
import { LOGIN_SUCCESS } from "../../../store/moduels/types";
import ErrorPage from "../../ErrorPage";

// 마이페이지 - 유저 정보 페이지
// 경로: /Mypage/Private/UserInfo
// 로그인을 안할 시 오류 메시지가 출력될 수 있습니다.
export const UserInfo = (props) => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    await axios
      .get("/api/user", authHeader)
      .then((response) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: { ...user, ...response.data } },
        });
      })
      .catch((err) => alert(err.response.data.error.message));
  };

  const [password] = useState("");
  const [receiveEmail, setReceiveEmail] = useState(user.isReceiveEmail);
  const [receiveSMS, setReceiveSMS] = useState(user.isReceiveSms);
  const isLogin = useSelector((state) => state.login.isLoggedIn);

  const { t } = useTranslation();

  const passwordPopup = useRef();

  const openPasswordPopup = (e) => {
    e.preventDefault();
    passwordPopup.current.toggleMenu();
  };

  const saveToSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const params = {
        isReceiveEmail: receiveEmail,
        isReceiveSms: receiveSMS,
      };
      await axios
        .patch(`/api/users/${user.userId}`, params, authHeader)
        .then(() => {
          alert("저장되었습니다.");
        })
        .catch((err) => alert(err.response.data.error.message));
    } else {
      props.history.push("/login");
      window.location.reload();
      alert("로그인 되어있지 않습니다");
    }
    await getUserData();
    window.location.reload();
  };
  if (isLogin) {
    try {
      return (
        <>
          <MyPage
            element={
              <div className="subMain mypage">
                <div className="center">
                  <TabBox />
                  <div className="mypage_table">
                    <table className="tb01">
                      <tbody>
                        <tr>
                          <th>{t("myPage_userInfo_name")}</th>
                          <td>{user.name}</td>
                        </tr>
                        <tr>
                          <th>{t("myPage_userInfo_hospital")}</th>
                          <td>
                            {user.hospital}, {user.department}
                          </td>
                        </tr>
                        <tr>
                          <th>{t("myPage_userInfo_license")}</th>
                          <td>{user.licenseNumber}</td>
                        </tr>
                        <tr>
                          <th>{t("myPage_userInfo_email")}</th>
                          <td>{user.email}</td>
                        </tr>
                        <tr>
                          <th>{t("myPage_userInfo_pw")}</th>
                          <td>
                            <a
                              href=""
                              className="password-btn"
                              onClick={openPasswordPopup}
                            >
                              {t("myPage_userInfo_pwBtn")}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>{t("myPage_userInfo_mobile")}</th>
                          <td>{phoneFomatter(`0${user.mobile}`)}</td>
                        </tr>
                        <tr>
                          <th>{t("myPage_userInfo_emailPush")}</th>
                          <td>
                            <input
                              type="radio"
                              id="이메일수신동의"
                              name="이메일수신"
                              checked={receiveEmail}
                              onChange={() => setReceiveEmail(true)}
                            />
                            <label htmlFor="이메일수신동의">
                              {t("myPage_userInfo_agree")}
                            </label>
                            <input
                              type="radio"
                              id="이메일수신동의안함"
                              name="이메일수신"
                              checked={!receiveEmail && true}
                              onChange={() => setReceiveEmail(false)}
                            />
                            <label htmlFor="이메일수신동의안함">
                              {t("myPage_userInfo_disAgree")}
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <th>{t("myPage_userInfo_smsPush")}</th>
                          <td>
                            <input
                              type="radio"
                              id="SMS수신동의"
                              name="SMS수신"
                              checked={receiveSMS && true}
                              onChange={() => setReceiveSMS(true)}
                            />
                            <label htmlFor="SMS수신동의">
                              {t("myPage_userInfo_agree")}
                            </label>
                            <input
                              type="radio"
                              id="SMS수신동의안함"
                              name="SMS수신"
                              checked={!receiveSMS && true}
                              onChange={() => setReceiveSMS(false)}
                            />
                            <label htmlFor="SMS수신동의안함">
                              {t("myPage_userInfo_disAgree")}
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bottomBtn">
                    <a href="" onClick={saveToSubmit}>
                      {t("myPage_userInfo_save")}
                    </a>
                  </div>
                </div>
              </div>
            }
          />
          <PasswordPopup ref={passwordPopup} />
        </>
      );
    } catch (err) {
      return <ErrorPage />;
    }
  } else {
    return <Redirect to="/Login" />;
  }
};
