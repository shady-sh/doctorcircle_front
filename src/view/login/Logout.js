import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../store/moduels/action";

// 로그아웃 페이지 (경로: /logout)
const Logout = ({ match }) => {
  const { t } = useTranslation();
  useEffect(() => {
    localStorage.removeItem("user");
    alert(t("logout"));
    window.location.href = "/";
  });
  return <></>;
};

export default Logout;
