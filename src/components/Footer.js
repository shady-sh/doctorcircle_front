import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import ConferenceModel from "../model/Conferences.model";
import { authHeader } from "../services/auth-header";
import Loading from "./Loading";

// 모든 페이지에 공동으로 사용되는 Footer 컴포넌트

const dontShowfootMenu = ["error"];

const Footer = ({ history, location }) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fecthLogo = async () => {
      try {
        setError(null);
        setLoading(true);
        const conferenceModel = new ConferenceModel(1, authHeader);
        conferenceModel
          .getConferenceInformation()
          .then((res) => setImage(res.logo));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fecthLogo();
  }, []);

  const { t } = useTranslation();
  for (let i = 0; i < dontShowfootMenu.length; i++) {
    if (location.pathname.toLowerCase().includes(dontShowfootMenu[i])) {
      return <></>;
    }
  }

  if (loading)
    return (
      <footer>
        <div className="center">
          <Loading />
        </div>
      </footer>
    );

  return (
    <footer>
      <div className="center">
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
          className="logo"
        >
          {image && <img src={image} />}
        </a>
        <div className="info">
          <p>
            {t("footer_address1")}
            <br className="m_only" />
            {t("footer_address2")}
          </p>
          <p> {t("footer_businessNum")}</p>
          <p className="copyright">
            Copyright ⓒ The Korean Academy of Family Medicine.{" "}
            <br className="m_only" />
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
