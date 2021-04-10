import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper/core";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import {
  ConfirmAlertPopup,
  ConfirmPopup,
  Popup,
} from "../../../components/Popup";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import ConferenceVODModel from "../../../model/Conference/VOD.model";
import { authHeader } from "../../../services/auth-header";
import ConferenceEBoothModel from "../../../model/Conference/EBooth.model";
import ErrorPage from "../../ErrorPage";
import ConferenceModel from "../../../model/Conferences.model";
import User from "../../../model/User/User.model";
import axios from "axios";
import { compareDate, getNow } from "../../../Formatter/DateFormatter";
import dateFormat from "dateformat";
import { Beforeunload, useBeforeunload } from "react-beforeunload";
import useBeforeUnload from "../../../components/PreventUnload";
import { Prompt } from "react-router-dom";
import Loading from "../../../components/Loading";
import Iframe from "react-iframe";

SwiperCore.use([Navigation, Autoplay]);

const ConferenceVODView = ({ match, history }) => {
  const { conferenceVodId } = match.params;
  const isLogin = useSelector((state) => state.login.isLoggedIn);

  const [leaveNext, setLeaveNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vod, setVod] = useState(null);
  const [conference, setConference] = useState(null);
  const [partner, setPartner] = useState(null);
  const [userVod, setUserVod] = useState(null);

  const [completeTime, setCompleteTime] = useState(null);

  const { t } = useTranslation();

  useBeforeUnload({
    when: true,
    message: `${t("liveView_movePop_desc1")} ${t("liveView_movePop_desc2")}`,
  });

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
      return;
    }
    const fetchVODView = async () => {
      try {
        setLoading(true);
        setError(null);
        const conferenceModel = new ConferenceModel(1, authHeader);
        const conferenceVODModel = new ConferenceVODModel(
          1,
          conferenceVodId,
          authHeader
        );
        const conferenceEBoothModel = new ConferenceEBoothModel();
        await conferenceModel
          .getConferenceInformation()
          .then((res) => setConference(res));
        await conferenceVODModel.getVodInformation().then((res) => setVod(res));
        await conferenceEBoothModel
          .getConferenceEboothList(1)
          .then((res) => setPartner(res.conferenceEbooths));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchVODView();
  }, []);

  useEffect(() => {
    const vodHistorySearch = async () => {
      if (vod) {
        if (!compareDate(vod.postStartAt, vod.postEndAt, getNow())) {
          history.push("/program");
          return;
        }
        try {
          setLoading(true);
          setError(null);
          setUserVod(null);
          const user = new User(authHeader);
          let count = 0;
          await user.getVodHistories().then((res) => {
            if (res.userVodHistories) {
              for (let i = 0; i < res.userVodHistories.length; i++) {
                if (
                  vod.conferenceVodId ===
                  res.userVodHistories[i].conferenceVodId
                ) {
                  setUserVod(res.userVodHistories[i]);
                  count++;
                  break;
                }
              }
            }
          });
          if (count <= 0) {
            await axios
              .post("/api/user/vod-histories", { conferenceVodId }, authHeader)
              .then((res) => setUserVod(res.data));
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      }
    };
    vodHistorySearch();
  }, [vod]);

  useEffect(() => {
    if (userVod && userVod.completeTime) {
      setCompleteTime(userVod.completeTime);
    }
  }, [userVod]);

  const user = useSelector((state) => state.login.user);

  const videoPlayPopup = useRef();
  const leavePopup = useRef();
  const moveRoomPopup = useRef();
  const altPopup = useRef();

  const isPC = useMediaQuery({ query: "(min-width:602px)" });
  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });

  const leaveNextAction = () => {
    if (completeTime) {
      history.push("/live");
      return;
    }
    axios
      .patch(
        `/api/user/vod-histories/${userVod.userVodHistoryId}`,
        {
          userId: user.userId,
        },
        authHeader
      )
      .then(() => history.push("/live"))
      .catch((err) => alert(err.response.data.error.message));
  };

  if (loading)
    return (
      <>
        {isMobile && (
          <div className="live-header">
            <Header />
          </div>
        )}
        <div id="wrapper">
          <div id="liveArea">
            <Loading />
          </div>
        </div>
      </>
    );

  if (error) return <ErrorPage />;
  try {
    return (
      <>
        {isMobile && (
          <div className="live-header">
            <Header />
          </div>
        )}
        <div id="wrapper">
          <div id="liveArea">
            <div className="leftArea">
              <div className="leftTop">
                {conference && <img src={conference.logo} className="logo" />}
                <div className="live_info">
                  {/* <div className="info01">Room A </div> */}
                  <div className="info02">{vod && vod.title}</div>
                  <div className="info04">
                    {vod && vod.postStartAt.replace(":00.000", "")} ~{" "}
                    {vod && vod.postEndAt.replace(":00.000", "")}
                  </div>
                </div>
              </div>
              <div className="leftMiddle">
                <div className="videoBox">
                  <div className="h-100">
                    {vod && vod.vod ? (
                      <Iframe
                        url={vod.vod}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      vod.vodUrl && (
                        <Iframe
                          url={vod.vodUrl}
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="leftBottom">
                <div className="partners_logo">
                  {isPC ? (
                    <Swiper
                      direction="horizontal"
                      slidesPerView={6}
                      spaceBetween={12}
                      simulateTouch={false}
                      navigation={{
                        nextEl: ".partners_logo .swiper-button-next",
                        prevEl: ".partners_logo .swiper-button-prev",
                      }}
                      loop={true}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                      {partner &&
                        partner.map((v, i) => {
                          return (
                            <SwiperSlide key={i}>
                              <img
                                src={v.company.logo}
                                className="swiper-slide border"
                                style={{
                                  height: isMobile ? "41px" : "66px",
                                }}
                              />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  ) : (
                    <Swiper
                      direction="horizontal"
                      slidesPerView={2.6}
                      spaceBetween={10}
                      simulateTouch={false}
                      navigation={{
                        nextEl: ".partners_logo .swiper-button-next",
                        prevEl: ".partners_logo .swiper-button-prev",
                      }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                      {partner &&
                        partner.map((v, i) => {
                          return (
                            <SwiperSlide key={i}>
                              <img
                                src={v.company.logo}
                                className="swiper-slide border"
                              />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  )}
                  <div className="swiper-button-prev button" />
                  <div className="swiper-button-next button" />
                </div>
              </div>
            </div>
            <div className="rightArea">
              <div className="rightTop">
                <div className="name">{user && user.name} 님</div>
                <div className="time">
                  {t("liveView_time")} : {userVod && userVod.entranceAt}
                </div>
                <img src="/img/icon_warning.png" className="warning" />
                <div className="hover_text">{t("liveView_hoverText")}</div>
              </div>
              <div className="rightMiddle">
                <div className="title"></div>
                <div className="notice">
                  <b>[Notice]</b>
                  {t("liveView_notice1")}
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t("liveView_notice2"),
                    }}
                  />
                  <a
                    href=""
                    className="xBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      $(".rightMiddle .notice").hide();
                    }}
                  >
                    <img src="/img/icon_close.png" />
                  </a>
                </div>
              </div>
              <div className="rightBottom">
                <a
                  href=""
                  className="exit"
                  onClick={(e) => {
                    e.preventDefault();
                    leavePopup.current.toggleMenu();
                  }}
                >
                  {t("liveView_leave")}
                </a>
              </div>
            </div>
          </div>
          <Popup
            ref={videoPlayPopup}
            desc={t("liveView_videoPop_desc1")}
            subDesc={t("liveView_videoPop_desc2")}
          />
          <ConfirmPopup
            ref={leavePopup}
            desc={dateFormat(getNow(), "HH:MM")}
            subDesc={t("liveView_leavePop_desc1")}
            subDesc_2={t("liveView_leavePop_desc2")}
            nextAction={async () => {
              await setLeaveNext(true);
              leaveNextAction();
            }}
          />
          <ConfirmAlertPopup
            ref={moveRoomPopup}
            desc={t("liveView_movePop_desc1")}
            subDesc={t("liveView_movePop_desc2")}
          />
        </div>
        <Prompt
          when={!leaveNext}
          message={`${t("liveView_movePop_desc1")} ${t(
            "liveView_movePop_desc2"
          )}`}
        />
      </>
    );
  } catch (e) {
    return (
      <>
        {isMobile && (
          <div className="live-header">
            <Header />
          </div>
        )}
        <div id="wrapper">
          <div id="liveArea">
            <Loading />
          </div>
        </div>
      </>
    );
  }
};

export default ConferenceVODView;
