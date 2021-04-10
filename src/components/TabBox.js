import { useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const TabBox = ({ location, history }) => {
  const [getCurrentPage] = useState(location.pathname.toLowerCase());
  const { t } = useTranslation();
  return (
    <div className="tabBox">
      <a
        href=""
        className={getCurrentPage.includes("userinfo") ? "on" : null}
        onClick={(e) => {
          e.preventDefault();
          history.push("/mypage/private/userinfo");
        }}
      >
        {t("myPage_userInfo")}
      </a>
      <a
        href=""
        className={getCurrentPage.includes("interestedlist") ? "on" : null}
        onClick={(e) => {
          e.preventDefault();
          history.push("/mypage/private/interestedlist/program/1");
        }}
      >
        {t("myPage_bookmark")}
      </a>
      <a
        href=""
        className={
          getCurrentPage.includes("participationhistory") ? "on" : null
        }
        onClick={(e) => {
          e.preventDefault();
          history.push("/mypage/private/participationhistory");
        }}
      >
        {t("myPage_participation")}
      </a>
    </div>
  );
};

export default withRouter(TabBox);
