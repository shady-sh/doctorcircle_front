import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import "swiper/swiper.scss";
import "./style/swiper.min.css";
import "./style/style.scss";
import "./style/common.scss";
import "./jquery/mcircle";
import {} from "jquery.cookie";
import i18n from "i18next";
import Footer from "./components/Footer";
import Quickmenu from "./components/Quickmenu";
import { routeLists } from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOGIN_SUCCESS } from "./store/moduels/types";
import authService from "./services/auth.service";
import ConferenceContainer from "./container/Conference.container";
import ConferenceModel from "./model/Conferences.model";
import { authHeader } from "./services/auth-header";

function getFaviconEl() {
  return document.getElementById("favicon");
}

const App = () => {
  const [faviconUrl, setFaviconUrl] = useState(null);
  const user = useSelector((state) => state.login.user);
  const selectedLang = useSelector((state) => state.counter.language);
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(selectedLang.toLowerCase());
    const fetchFavicon = async () => {
      try {
        const conferenceModel = new ConferenceModel(1, authHeader);
        conferenceModel
          .getConferenceInformation()
          .then((res) => setFaviconUrl(res.favicon));
      } catch (e) {}
    };
    fetchFavicon();
  }, []);

  useEffect(() => {
    const favicon = getFaviconEl();
    favicon.href = faviconUrl;
  }, [faviconUrl]);

  const onSilentRefresh = async () => {
    if (user) {
      const { refreshToken, refreshTokenExpireAt } = user;
      const data = { refreshToken, refreshTokenExpireAt };
      axios
        .post("/api/oauth/token", data)
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
          getUserData();
        })
        .catch((err) => {
          authService.logoutWithoutAlert();
        });
    }
  };

  useEffect(() => {
    loginCheck();
    setTimeout(onSilentRefresh, 100);
  }, []);

  const getUserData = async () => {
    await axios.get("/api/user", authHeader).then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: { ...user, ...response.data } },
      });
    });
  };

  const loginCheck = () => {
    if (
      !localStorage.getItem("user") &&
      window.location.href.toLowerCase().includes("mypage")
    ) {
      return <Redirect to="/Login" />;
    } else {
      return <></>;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ConferenceContainer} />
        {/* <Route exact path="/" component={HomeContainer} /> */}
        {routeLists.map((v, i) => {
          if (v.layout) {
            return (
              <Route
                path={`${v.layout}${v.path}`}
                component={v.component}
                key={i}
              />
            );
          } else {
            return <Route path={v.path} component={v.component} key={i} />;
          }
        })}
        <Footer />
        {window.location.href == "/Mypage/Private/InterestedList" ||
        window.location.href == "/Mypage/Private/InterestedList/:name" ? (
          <Redirect to="/mypage/private/interestedList/abstract" />
        ) : (
          <></>
        )}
        {loginCheck()}
        <Quickmenu />
      </BrowserRouter>
    </div>
  );
};

export default App;
