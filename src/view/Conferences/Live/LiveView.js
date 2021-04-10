import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper/core";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { AlertPopup, ConfirmPopup, Popup } from "../../../components/Popup";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import Header from "../../../components/Header";
import ConferenceLiveViewModel from "../../../model/Conference/LiveView.model";
import { authHeader } from "../../../services/auth-header";
import { useSelector } from "react-redux";
import ConferenceModel from "../../../model/Conferences.model";
import ErrorPage from "../../ErrorPage";
import ConferenceEBoothModel from "../../../model/Conference/EBooth.model";
import User from "../../../model/User/User.model";
import ConferenceScheduleModel from "../../../model/Conference/Schedules.model";
import axios from "axios";
import {
  compareDate,
  dateMinus,
  getNow,
  getToday,
} from "../../../Formatter/DateFormatter";
import ConferenceLiveModel from "../../../model/Conference/Live.model";
import useBeforeUnload from "../../../components/PreventUnload";
import { Prompt } from "react-router-dom";
import Loading from "../../../components/Loading";
import Iframe from "react-iframe";

SwiperCore.use([Navigation, Autoplay]);

const ConferenceLiveView = ({ match, history }) => {
  const { conferenceLiveId } = match.params;

  const isLogin = useSelector((state) => state.login.isLoggedIn);

  const [leaveNext, setLeaveNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [live, setLive] = useState();
  const [conference, setConference] = useState();
  const [partner, setPartner] = useState(null);
  const [userLive, setUserLive] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [nowTime, setNowTime] = useState(getNow());

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
    const fetchLiveView = async () => {
      try {
        setLoading(true);
        setError(null);
        const conferenceModel = new ConferenceModel(1, authHeader);
        const conferenceEBoothModel = new ConferenceEBoothModel();
        const conferenceLiveViewModel = new ConferenceLiveViewModel(
          1,
          conferenceLiveId,
          authHeader
        );
        await conferenceModel
          .getConferenceInformation()
          .then((res) => setConference(res));
        await conferenceEBoothModel.getConferenceEboothList(1).then((res) => {
          setPartner(res.conferenceEbooths);
        });
        await conferenceLiveViewModel
          .getConferenceLive()
          .then((res) => setLive(res));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);
        const conferneceScheduleModel = new ConferenceScheduleModel(1);
        await conferneceScheduleModel.getScheduleList().then((res) => {
          setSchedules(res.conferenceSchedules);
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchLiveView();
    fetchSchedules();
  }, []);

  useEffect(() => {
    const liveHistorySearch = async () => {
      if (live) {
        if (!compareDate(live.startAt, live.endAt, getNow())) {
          history.push("/live");
          return;
        }
        try {
          setLoading(true);
          setError(null);
          setUserLive(null);
          const user = new User(authHeader);
          let count = 0;
          await user.getHistories().then((res) => {
            if (res.userLiveHistories) {
              for (let i = 0; i < res.userLiveHistories.length; i++) {
                if (
                  live.conferenceLiveId ===
                  res.userLiveHistories[i].conferenceLiveId
                ) {
                  setUserLive(res.userLiveHistories[i]);
                  count++;
                  break;
                }
              }
            }
          });
          if (count <= 0) {
            await axios
              .post(
                "/api/user/live-histories",
                { conferenceLiveId },
                authHeader
              )
              .then((res) => {
                setUserLive(res.data);
              });
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      }
    };
    liveHistorySearch();
  }, [live]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (schedules) {
        try {
          setLoading(true);
          setError(null);
          let count = 0;
          const getSchedules = schedules;
          for (let i = 0; i < getSchedules.length; i++) {
            if (
              compareDate(
                getSchedules[i].totalStartAt,
                getSchedules[i].totalEndAt,
                getToday()
              )
            ) {
              const getRooms = await axios.get(
                `/api/conferences/1/schedules/${getSchedules[i].conferenceScheduleId}/rooms`,
                { params: { date: getToday() } }
              );
              console.log(getRooms.data);
              setRooms(getRooms.data.conferenceScheduleRooms);
              count++;
              break;
            }
          }
          if (count < 1) {
            setRooms(null);
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      }
    };
    fetchRooms();
  }, [schedules]);

  useEffect(() => {
    if (userLive) {
      if (userLive.completeTime) {
        setCompleteTime(userLive.completeTime);
      }
    }
  }, [userLive]);

  const user = useSelector((state) => state.login.user);
  const videoPlayPopup = useRef();
  const leavePopup = useRef();
  const unjoinable = useRef();
  const moveRoomPopup = useRef([]);

  const isPC = useMediaQuery({ query: "(min-width:602px)" });
  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });
  if (!user) {
    history.push("/login");
    return;
  }

  const clickToExit = (e) => {
    setNowTime(getNow());
    e.preventDefault();
    if (completeTime) {
      leavePopup.current.toggleMenu();
      return;
    }
    leavePopup.current.toggleMenu();
    dateMinus(userLive.entranceAt);
  };

  const leaveNextAction = () => {
    if (completeTime) {
      history.push("/live");
      return;
    }
    axios
      .patch(
        `/api/user/live-histories/${userLive.userLiveHistoryId}`,
        { userId: user.userId },
        authHeader
      )
      .then(() => history.push("/live"));
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
                  <div className="info01">
                    {live &&
                      live.conferenceScheduleSession.conferenceScheduleRoom
                        .name}
                  </div>
                  <div className="info02">{live && live.title}</div>
                  <div className="info03">
                    {live &&
                      live.conferenceScheduleSession
                        .conferenceScheduleSessionModerators[0].name}
                    ,{" "}
                    {
                      live.conferenceScheduleSession
                        .conferenceScheduleSessionModerators[0].hospital
                    }{" "}
                    &nbsp; | &nbsp; 좌장명, 소송상세
                  </div>
                  <div className="info04">
                    {live && live.startAt.replace(":00.000", "")} ~{" "}
                    {live && live.endAt.replace(":00.000", "")}
                  </div>
                </div>
              </div>
              <div className="leftMiddle">
                <div
                  className="videoBox"
                  onClick={() => videoPlayPopup.current.toggleMenu()}
                >
                  <div className="h-100">
                    {live && live.channelType == 0 ? (
                      <Iframe
                        url={live && live.liveUrl}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <Iframe
                        url={live && live.backupUrl}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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
                  {t("liveView_time")} : {userLive.entranceAt}
                </div>
                <img src="/img/icon_warning.png" className="warning" />
                <div className="hover_text">{t("liveView_hoverText")}</div>
              </div>
              <div className="rightMiddle">
                {/* <div className="title">채팅</div> */}
                <div className="notice">
                  <b>[Notice]</b>
                  {t("liveView_notice1")}
                  <br />
                  <div
                    dangerouslySetInnerHTML={{ __html: t("liveView_notice2") }}
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
                <iframe
                  id="chattingView"
                  src={`https://www.ustream.tv/socialstream/${
                    live && live.chatCode
                  }?videos=0`}
                  webkitAllowFullScreen
                  allowFullScreen
                  frameBorder="no"
                />
              </div>
              <div className="rightBottom">
                <div className="room">
                  <input type="checkbox" id="Room이동" />
                  <label
                    htmlFor="Room이동"
                    className="mt-1 text-center"
                    onClick={() => setNowTime(getNow())}
                  >
                    {t("liveView_moveRoom")}
                  </label>
                  <div className="room_list">
                    {rooms &&
                      rooms.map((v, i) => {
                        return (
                          <a
                            key={i}
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              // if (
                              //   v.name ===
                              //   live.conferenceScheduleSession
                              //     .conferenceScheduleRoom.name
                              // ) {
                              //   return;
                              // }
                              moveRoomPopup.current[i].toggleMenu();
                            }}
                          >
                            {v.name}
                          </a>
                        );
                      })}
                  </div>
                </div>
                <a href="" className="exit" onClick={clickToExit}>
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
            desc={dateFormat(nowTime, "HH:MM")}
            subDesc={t("liveView_leavePop_desc1")}
            subDesc_2={t("liveView_leavePop_desc2")}
            nextAction={async () => {
              await setLeaveNext(true);
              leaveNextAction();
            }}
          />
          {rooms &&
            rooms.map((v, i) => {
              return (
                <ConfirmPopup
                  key={i}
                  ref={(el) => (moveRoomPopup.current[i] = el)}
                  desc={dateFormat(nowTime, "HH:MM")}
                  subDesc={t("liveView_leavePop_desc1")}
                  subDesc_2={t("liveView_leavePop_desc2")}
                  nextAction={() => {
                    let selectedSession;
                    for (
                      let idx = 0;
                      idx < v.conferenceScheduleSessions.length;
                      idx++
                    ) {
                      if (
                        compareDate(
                          v.conferenceScheduleSessions[idx].startAt,
                          v.conferenceScheduleSessions[idx].endAt,
                          getNow()
                        )
                      ) {
                        selectedSession = v.conferenceScheduleSessions[idx];
                        const conferenceLiveModel = new ConferenceLiveModel(1);
                        let selectLiveId;
                        conferenceLiveModel.getLiveList().then((res) => {
                          for (
                            let index = 0;
                            index < res.conferenceLives.length;
                            index++
                          ) {
                            if (
                              selectedSession.conferenceScheduleSessionId ===
                              res.conferenceLives[index]
                                .conferenceScheduleSessionId
                            ) {
                              if (completeTime) {
                                history.push(`/live_view/${selectLiveId}`);
                                return;
                              }
                              axios
                                .patch(
                                  `/api/user/live-histories/${userLive.userLiveHistoryId}`,
                                  authHeader
                                )
                                .then(() => {
                                  selectLiveId =
                                    res.conferenceLives[index].conferenceLiveId;
                                  window.location.href = `/live_view/${selectLiveId}`;
                                });
                              return;
                            }
                          }
                        });
                        return;
                      }
                    }
                    if (selectedSession) {
                      const conferenceLiveModel = new ConferenceLiveModel(1);
                      let selectLiveId;
                      conferenceLiveModel.getLiveList().then((res) => {
                        for (
                          let index = 0;
                          index < res.conferenceLives.length;
                          index++
                        ) {
                          if (
                            selectedSession.conferenceScheduleSessionId ===
                            res.conferenceLives[index]
                              .conferenceScheduleSessionId
                          ) {
                            selectLiveId =
                              res.conferenceLives[index].conferenceLiveId;
                            return;
                          }
                        }
                      });
                      if (!selectLiveId) {
                        unjoinable.current.toggleMenu();
                        return;
                      }
                      if (completeTime) {
                        history.push(`/live_view/${selectLiveId}`);
                        return;
                      }
                      axios
                        .patch(
                          `/api/user/live-histories/${userLive.userLiveHistoryId}`,
                          authHeader
                        )
                        .then(
                          () =>
                            (window.location.href = `/live_view/${selectLiveId}`)
                        );
                    } else {
                      unjoinable.current.toggleMenu();
                      return;
                    }
                  }}
                />
              );
            })}
          <AlertPopup ref={unjoinable} desc={t("program_noTime")} />
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

export default ConferenceLiveView;
