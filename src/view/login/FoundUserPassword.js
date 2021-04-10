import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

let currEmail;
let currMobile;

// 비밀번호를 찾게됬을 경우(/FindUserPassword 경로에서 정보를 정확하게 입력 후 )
// 이 페이지로 넘어오게 될 경우 비밀번호를 재설정하는 기능이 있습니다.
const FoundUserPassword = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useSelector((state) => state.login.user);
  const { t } = useTranslation("");

  const onChangeNewPassword = (e) => setNewPassword(e.target.value);
  const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const changePasswordToSubmit = (e) => {
    e.preventDefault();
    if (newPassword == confirmPassword) {
      axios
        .post("/api/auth/forgot/password", {
          type: "email",
          identifier: user.email,
          newKey: newPassword,
        })
        .then(() => {
          alert(t("foundPW_success"));
          props.history.push("/login");
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error.message);
        });
    }
  };

  try {
    currEmail = props.location.state.email;
    currMobile = props.location.state.mobile;
    if (!currEmail) {
      props.history.push("/FindUserPassword");
      window.location.reload();
    }
  } catch (e) {
    window.location.href = "/FindUserPassword";
  }
  return (
    <div id="wrapper">
      <div className="login">
        <div className="center">
          <a href="/" className="logo">
            <img src="/img/logo.png" />
          </a>
          <div className="title">{t("foundPW_title")}</div>
          <ul className="formBox">
            <div className="form_title mgT0">{t("foundPW_titleNew")}</div>
            <li>
              <div className="inputBox">
                <input
                  type="password"
                  placeholder={t("foundPW_newPasswordInput")}
                  value={newPassword}
                  onChange={onChangeNewPassword}
                />
              </div>
            </li>
            <div className="form_title">{t("foundPW_titleConfirm")}</div>
            <li>
              <div className="inputBox">
                <input
                  type="password"
                  placeholder={t("foundPW_confirmInput")}
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                />
              </div>
            </li>

            <a href="" className="bottomBtn" onClick={changePasswordToSubmit}>
              {t("foundPW_confirm")}
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoundUserPassword;
