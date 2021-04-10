import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import LoginTitle from "../../components/LoginTitle";
import { PC } from "../../MediaQuery";

// 아이디를 찾게됬을 경우 (경로: /FindUserID 에서 정보를 입력 후 들어오셔야 합니다.)
// FindUserID에서 props값으로 인자를 넘겨 받은 값을 여기에 출력시켜 줍니다.
const FoundID = (props) => {
  const foundEmail = props.location.state.userEmail;
  // const foundEmail = "dhtmdgusxX@naver.com";

  const { t } = useTranslation();

  const moveLoginPage = (e) => {
    e.preventDefault();
    props.history.push("/login");
  };

  const moveFindPasswordPage = (e) => {
    e.preventDefault();
    props.history.push("/FindUserPassword");
  };

  return (
    <div id="wrapper">
      <div className="login">
        <div className="center">
          <a href="/" className="logo">
            <img src="/img/logo.png" />
          </a>
          <div className="title">{t("foundID_title")}</div>
          <div className="textBox">
            <div className="text01">{t("foundID_text01")}</div>
            <div className="text02">{foundEmail}</div>
          </div>
          <div className="btnBox">
            <a href="" onClick={moveLoginPage}>
              {t("foundID_btnLogin")}
            </a>
            <a href="" onClick={moveFindPasswordPage}>
              {t("foundID_btnFindPW")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundID;
