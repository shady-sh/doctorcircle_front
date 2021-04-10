//모든 페이지에 있는 Quickmenu 를 컴포넌트화 해서 재사용성을 높임

import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const dontShowQuickMenu = [
  "live_view",
  "vod_view",
  "login",
  "finduserid",
  "foundid",
  "finduserpassword",
  "founduserpassword",
  "error",
];

const Quickmenu = ({ history, location }) => {
  const { t } = useTranslation();
  for (let i = 0; i < dontShowQuickMenu.length; i++) {
    if (location.pathname.toLowerCase().includes(dontShowQuickMenu[i])) {
      return <></>;
    }
  }
  return (
    <div id="quick_menu">
      <a
        href=""
        onClick={e => {
          e.preventDefault();
          history.push("/mypage/notify");
        }}
      >
        <img src="/img/icon_notify.png" />
        <p>{t("quickMenu_notice")}</p>
      </a>
      <a
        href=""
        onClick={e => {
          e.preventDefault();
          history.push("/mypage/private/qna");
        }}
      >
        <img src="/img/icon_inquiry.png" />
        <p>{t("quickMenu_inQuiry")}</p>
      </a>
      <a
        href=""
        className="topBtn"
        onClick={e => {
          e.preventDefault();
          window.scrollTo(0, 0);
        }}
      >
        <img src="/img/icon_top_arrow.png" />
        <p>TOP</p>
      </a>
    </div>
  );
};

export default withRouter(Quickmenu);
