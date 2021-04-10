import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeLanguage } from "../store/moduels/action";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConferenceModel from "../model/Conferences.model";
import { authHeader } from "../services/auth-header";
import { useMediaQuery } from "react-responsive";

export const titles = [
  "Welcome",
  "Speakers",
  "Program",
  "Live",
  "Abstracts",
  "E-Booth",
];

const headerItems = [
  {
    className: "inc_sub",
    titles: "Welcome",
    subNav: [
      { path: "", name: "학회소개" },
      { path: "", name: "연혁" },
      { path: "", name: "임원소개" },
      { path: "", name: "입회안내" },
    ],
  },
  {
    className: "inc_sub",
    titles: "Speakers",
    subNav: [
      { path: "", name: "서브메뉴" },
      { path: "", name: "서브메뉴" },
      { path: "", name: "서브메뉴" },
      { path: "", name: "서브메뉴" },
    ],
  },
  {
    className: "inc_sub",
    titles: "Program",
    subNav: [
      { path: "", name: "서브메뉴" },
      { path: "", name: "서브메뉴" },
      { path: "", name: "서브메뉴" },
      { path: "", name: "서브메뉴" },
    ],
  },
  { titles: "LIVE" },
  { titles: "Abstracts" },
  { titles: "E-Booth" },
];

const Header = ({ history, element }) => {
  const [logoImg, setLogoImg] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const user = useSelector((state) => state.login.user);
  const isLogin = useSelector((state) => state.login.isLoggedIn);
  const selectedLang = useSelector((state) => state.counter.language);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });

  const setLang = (language) => {
    dispatch(changeLanguage(language));
  };

  const onClickToShow = (e) => {
    e.preventDefault();
    window.$("header .nav").show();
  };
  useEffect(() => {
    const conferenceModel = new ConferenceModel(1, authHeader);
    conferenceModel
      .getConferenceInformation()
      .then((res) => {
        setLogoImg(res.logo);
      })
      .catch((err) => console.log(err));
    // 현재 컨퍼런스 아이디를 리덕스에 저장
  }, []);

  useEffect(() => {
    window.$(document).ready(function () {
      if (window.$(window).width() > 1024) {
        window.$("header .nav li").hover(
          function () {
            window.$("header").css("background-color", "rgba(0, 0, 0, 0.4)");
          },
          function () {
            window.$("header").css("background-color", "transparent");
          }
        );

        window.$("header .nav li.inc_sub").hover(
          function () {
            window.$(this).children(".subNav").show();
            window.$("header .navBg").show();
          },
          function () {
            window.$("header .nav li.inc_sub > a + .subNav").hide();
            window.$("header .navBg").hide();
          }
        );
      }

      if (window.$(window).width() <= 1024) {
        window.$("header .nav li > a").click(function () {
          window.$(".subNav_active_hide").addClass("hide");
          window.$(".subNav_active_show").addClass("show");
          window.$(this).next(".subNav").show();
        });

        window.$("header .nav .btn_back").click(function () {
          window.$(".subNav_active_hide").removeClass("hide");
          window.$(".subNav_active_show").removeClass("show");
          window.$("header .nav li > a + .subNav").hide();
        });
      }
    });
  });

  const onClickToHide = (e) => {
    e.preventDefault();
    window.$("header .nav").hide();
    window.$(".subNav_active_hide").removeClass("hide");
    window.$(".subNav_active_show").removeClass("show");
    window.$("header .nav li > a + .subNav").hide();
  };

  return (
    <>
      <header>
        <div className="center">
          <a
            href=""
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              history.push("/");
            }}
            style={{ backgroundImage: `url(${logoImg})` }}
          />

          <ul className="nav">
            <div className="rightBox mt-1">
              <div className="language subNav_active_hide">
                <input type="checkbox" id="language_select" />
                <label htmlFor="language_select">{selectedLang}</label>
                <div className="language_list">
                  <a
                    href=""
                    className={selectedLang == "KR" ? "active" : null}
                    onClick={(e) => {
                      e.preventDefault();
                      setLang("KR");
                    }}
                  >
                    KR
                  </a>
                  <a
                    href=""
                    className={selectedLang == "EN" ? "active" : null}
                    onClick={(e) => {
                      e.preventDefault();
                      setLang("EN");
                    }}
                  >
                    EN
                  </a>
                </div>
              </div>
              <a href="" className="btn_back m_only subNav_active_show">
                <img src="/img/icon_back.png" />
              </a>
              <a href="" onClick={onClickToHide} className="btn_close m_only">
                <span>닫기</span>
                <img src="/img/btn_close.svg" />
              </a>
            </div>

            <div className="loginBox m_only subNav_active_hide">
              {!isLogin ? (
                "로그인해주세요."
              ) : (
                <>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {user && user.name} 님&nbsp;
                  </a>
                  <a href="/logout">
                    {"|"} {t("logout_btn")}
                  </a>
                </>
              )}
              {!isLogin && (
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/login");
                  }}
                  className="login-btn"
                >
                  로그인
                </a>
              )}
            </div>
            {headerItems.map((v, i) => {
              return (
                <li className={v.className} key={i}>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/${v.titles}`);
                    }}
                  >
                    {v.titles}
                  </a>
                  <div className="subNav" style={{ display: "none" }}>
                    {v.subNav
                      ? v.subNav.map((val, idx) => {
                          return (
                            <a
                              key={idx}
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                history.push(val.path);
                              }}
                            >
                              {val.name}
                            </a>
                          );
                        })
                      : null}
                  </div>
                  {isMobile && (
                    <img
                      src="/img/icon_more.png"
                      style={{
                        position: "absolute",
                        width: "10px",
                        top: "22px",
                        right: "5px",
                      }}
                    />
                  )}
                </li>
              );
            })}

            <div className="m_quick_nav m_only subNav_active_hide">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/mypage/notify");
                }}
              >
                {t("quickMenu_notice")}{" "}
                <img src="/img/icon_new.svg" className="new" />
              </a>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/mypage/private/qna");
                }}
              >
                {t("quickMenu_inQuiry")}
              </a>
            </div>
          </ul>

          {isLogin ? (
            <div
              onClick={() => setDropdown(!dropdown)}
              className="account on cursor"
            >
              {dropdown && (
                <div className="account_list">
                  <div
                    className="items text-center cursor"
                    onClick={() => history.push("/mypage/private/userinfo")}
                  >
                    {t("mypage")}
                  </div>
                  <div
                    className="items text-center cursor"
                    onClick={() => history.push("/logout")}
                  >
                    {t("logout_btn")}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                history.push("/login");
              }}
              className="account"
            />
          )}

          <a href="" onClick={onClickToShow} className="navBtn m_only" />
        </div>
        <div className="navBg" />
      </header>
      <div id="wrapper">{element}</div>
    </>
  );
};

export default withRouter(Header);
