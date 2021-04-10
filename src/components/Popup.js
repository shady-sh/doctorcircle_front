import axios from "axios";
import i18next from "i18next";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import $ from "jquery";
import {} from "jquery.cookie";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import ConferenceEBoothModel from "../model/Conference/EBooth.model";
import ErrorPage from "../view/ErrorPage";
import ScheduleSessionModel from "../model/Conference/ScheduleSession.model";
import User from "../model/User/User.model";
import { authHeader } from "../services/auth-header";
import ConferenceETestModel from "../model/Conference/ETest.model";
import { compareDate, getNow, getToday } from "../Formatter/DateFormatter";
import { Fragment } from "react";
import ConferenceLiveModel from "../model/Conference/Live.model";
import { useHistory } from "react-router-dom";
import ConferenceLiveViewModel from "../model/Conference/LiveView.model";
import ConferenceVODModel from "../model/Conference/VOD.model";
import PopupLoading from "./PopupLoading";
import useWindowDimensions from "./WindowDimension";
import { getFileName } from "../Formatter/FileName";
import { download } from "./Download";
import ConferenceEventModel from "../model/Conference/Event.model";

const logoStyle = {
  width: "180px",
  height: "64px",
  border: "1px solid rgb(225,225,225)",
};
// 알림메시지를 AlertPopup을 import 하여 Props 값을 넘겨주면 알림메시지 팝업을 자동적으로 구현 할 수 있습니다.

export const Popup = forwardRef((props, ref) => {
  const [popupShow, setPopupShow] = useState(false);
  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(!popupShow);
    },
  }));
  return (
    <>
      {popupShow ? (
        <div className="layer_popup">
          <div className="popup_main">
            <p style={{ marginTop: "0" }}>
              {props.desc}
              {props.subDesc ? (
                <>
                  <br />
                  {props.subDesc}
                </>
              ) : (
                <></>
              )}
              {props.subDesc2 && (
                <>
                  <br />
                  {props.subDesc2}
                </>
              )}
            </p>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setPopupShow(false);
                if (props.nextAction) {
                  props.nextAction();
                }
              }}
              className="popupBtn"
            >
              {i18next.t("btn_confirm")}
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

export const AlertPopup = forwardRef((props, ref) => {
  const [popupShow, setPopupShow] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(!popupShow);
    },
  }));
  return (
    <>
      {popupShow ? (
        <>
          <div className="layer_popup">
            <div className="popup_main">
              <img src="/img/icon_warning.png" className="warning" />
              <p>
                {props.desc}
                {props.subDesc ? (
                  <>
                    <br />
                    {props.subDesc}
                  </>
                ) : (
                  <></>
                )}
              </p>
              <a
                href=""
                className="popupBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setPopupShow(false);
                }}
              >
                {i18next.t("btn_confirm")}
              </a>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
});

export const ConfirmPopup = forwardRef((props, ref) => {
  const [popupShow, setPopupShow] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(true);
    },
  }));

  const onClickConfirm = (e) => {
    e.preventDefault();
    setPopupShow(false);
    if (props.nextAction) {
      props.nextAction();
    }
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };

  return (
    <>
      {popupShow ? (
        <>
          <div className="layer_popup">
            <div className="popup_main">
              <p style={{ marginTop: "0" }}>
                {props.desc}
                {props.subDesc ? (
                  <>
                    <br />
                    {props.subDesc}
                    {props.subDesc_2 ? (
                      <>
                        <br />
                        {props.subDesc_2}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </p>
              <div className="multiBtn">
                <a href="" onClick={onClickConfirm}>
                  {i18next.t("btn_confirm")}
                </a>
                <a href="" onClick={onClickCancel}>
                  {i18next.t("btn_cancel")}
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
});

export const ConfirmAlertPopup = forwardRef((props, ref) => {
  const [popupShow, setPopupShow] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(!popupShow);
    },
  }));

  const onClickConfirm = (e) => {
    e.preventDefault();
    setPopupShow(false);
    if (props.nextAction) {
      props.nextAction();
    }
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };

  return (
    <>
      {popupShow ? (
        <>
          <div className="layer_popup">
            <div className="popup_main">
              <img src="/img/icon_warning.png" className="warning" />
              <p>
                {props.desc}
                {props.subDesc ? (
                  <>
                    <br />
                    {props.subDesc}
                    {props.subDesc_2 ? (
                      <>
                        <br />
                        {props.subDesc_2}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </p>
              <div className="multiBtn">
                <a href="" onClick={onClickConfirm}>
                  {i18next.t("btn_confirm")}
                </a>
                <a href="" onClick={onClickCancel}>
                  {i18next.t("btn_cancel")}
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
});

export const PopupConference = forwardRef((props, ref) => {
  const [popupShow, setPopupShow] = useState(true);
  const [checked, setChecked] = useState(false);
  const { id, popupImg, url, isDaily } = props;
  const HAS_VISITED_BEFORE = id && $.cookie(`hasVisitedBefore${id}`);

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(!popupShow);
    },
  }));

  const handleClick = () => {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
      $.removeCookie(`hasVisitedBefore${id}`);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    if (checked) {
      $.cookie(`hasVisitedBefore${id}`, true, { expires: 1 });
    }
    setPopupShow(false);
  };

  if (HAS_VISITED_BEFORE) {
    return <></>;
  }

  return (
    <>
      {popupShow && popupImg && (
        <div id="popup_conference" className="layer_popup">
          <div className="popup_main">
            <a href="" className="closeBtn" onClick={handleClose}>
              <img src="/img/icon_close.png" />
            </a>
            <a href={url && url} className="img_link">
              {popupImg && <img src={popupImg} />}
              {/* <img src="/img/popup01.png" /> */}
            </a>
            {isDaily && (
              <div className="week_check">
                <input
                  type="checkbox"
                  id="하루보지않기"
                  checked={checked}
                  onChange={handleClick}
                />
                <label htmlFor="하루보지않기">하루 동안 보지 않기</label>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

// E-booth 이벤트 팝업
const stampList = [
  { name: "동국제약", logo: "logo_dongkook.png" },
  { name: "하나제약주식회사", logo: "logo_hana.png" },
  { name: "한미약품", logo: "logo_hanmi.png" },
  { name: "경동제약", logo: "logo_kyungdong.png" },
  { name: "AMGEN", logo: "logo_amgen.png" },
  { name: "MSD", logo: "logo_msd.png" },
  { name: "삼성서울병원", logo: "logo_samsung2.png" },
  { name: "Medtronic", logo: "logo_medtronic.png" },
];

export const EBoothEventPopup = forwardRef((props, ref) => {
  const [popupShow, setPopupShow] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(true);
    },
  }));

  const handleClose = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };

  return (
    <>
      {popupShow ? (
        <div id="popup_eBooth_event" className="layer_popup">
          <div className="popup_main">
            <a href="" className="closeBtn" onClick={handleClose}>
              <img src="/img/icon_close.png" />
            </a>
            <div className="popup_title">E-Booth 이벤트</div>
            <div className="eventBox">
              <div className="event_title">
                E-Booth 이벤트를 참여하시고, 스탬프를 찍어주세요.
                <br />
                추첨을 통해 선물을 드립니다.
              </div>
              <div className="event_date">
                이벤트 기간 : 2021. 02. 01 ~ 2021. 02. 28
              </div>
              <span className="event_img">
                <figure>
                  <img src="/img/img_coffee.png" />
                  <div className="number">10명</div>
                </figure>
                <div className="text">스타벅스 기프티콘</div>
              </span>
              <ul className="stamp_list">
                {stampList.map((v, i) => {
                  return (
                    <li key={i}>
                      <div className="name">{v.name}</div>
                      <input
                        type="radio"
                        id={i + 1 < 10 ? `stamp0${i + 1}` : `stamp${i + 1}`}
                      />
                      <label
                        htmlFor={
                          i + 1 < 10 ? `stamp0${i + 1}` : `stamp${i + 1}`
                        }
                      />
                      <figure className="logo">
                        <img src={`img/${v.logo}`} />
                      </figure>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

export const EBoothPopup = forwardRef((props, ref) => {
  const { booth } = props;
  const { conferenceEboothId } = booth;
  const [attendance, setAttendance] = useState(false);
  const [popupShow, setPopupShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventEBooth, setEventEBooth] = useState(null);
  const [info, setInfo] = useState(null);
  const [event, setEvent] = useState(null);

  const isLogin = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    const fetchInformation = async () => {
      if (popupShow) {
        console.log(conferenceEboothId);
        try {
          setLoading(true);
          setError(null);
          setInfo(null);
          const conferenceEBoothModel = new ConferenceEBoothModel();
          const conferenceEventModel = new ConferenceEventModel();
          await conferenceEBoothModel
            .getConferenceEboothInfo(1, conferenceEboothId)
            .then((res) => {
              setInfo(res);
            });
          await conferenceEventModel.getEventList(1).then((res) => {
            for (let i = 0; i < res.conferenceEvents.length; i++) {
              if (
                compareDate(
                  res.conferenceEvents[i].startAt,
                  res.conferenceEvents[i].endAt,
                  getNow()
                )
              ) {
                setEvent(res.conferenceEvents[i]);
                break;
              }
            }
          });
        } catch (e) {
          setError(e);
        }
      }
    };
    fetchInformation();
  }, [popupShow]);

  useEffect(() => {
    if (event) {
      const fetchEventEbooth = async () => {
        try {
          setLoading(true);
          setError(null);
          const conferenceEventModel = new ConferenceEventModel();
          await conferenceEventModel
            .getEventEbooths(1, event.conferenceEventId, authHeader)
            .then((res) => {
              console.log(res);
              for (let i = 0; i < res.conferenceEventEbooths.length; i++) {
                if (
                  res.conferenceEventEbooths[i].conferenceEboothId ===
                  conferenceEboothId
                ) {
                  setEventEBooth(res.conferenceEventEbooths[i]);
                  break;
                }
              }
            });
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchEventEbooth();
    }
  }, [event]);

  useEffect(() => {
    if (eventEBooth && eventEBooth.userEventHistories.length > 0) {
      setAttendance(true);
    } else {
      setAttendance(false);
    }
  }, [eventEBooth]);

  const getEboothVideo = () => {
    if (info && info.conferenceEboothVods.length > 0) {
      const vodInfo = info.conferenceEboothVods[0].conferenceVod;
      if (vodInfo && vodInfo.vod) {
        return (
          <video controls>
            <source src={vodInfo.vod} />
          </video>
        );
      } else if (vodInfo.vodUrl) {
        <iframe
          src={vodInfo.vodUrl}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />;
      }
    }
  };

  const { t } = useTranslation();
  const joined = useRef();
  const alreadyJoined = useRef();

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(true);
    },
  }));

  const handleClose = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };

  if (loading) return <PopupLoading />;

  if (error)
    return (
      <div id="popup_eBooth" className="layer_popup">
        <div className="popup_main">
          <a href="" onClick={handleClose} className="closeBtn">
            <img src="/img/icon_close.png" />
          </a>
        </div>
        <div className="popup_title">{booth.company.name}</div>
      </div>
    );

  return (
    <>
      {popupShow ? (
        <div id="popup_eBooth" className="layer_popup">
          <div className="popup_main">
            <a href="" onClick={handleClose} className="closeBtn">
              <img src="/img/icon_close.png" />
            </a>
            <div className="popup_title">{booth.company.name}</div>
            <div className="partner_info">
              <img
                src={booth.company.logo}
                style={logoStyle}
                className="logo"
              />
              <div className="info_text">
                <p>
                  <b>홈페이지 주소</b> : {booth.company.url}
                </p>
                <p>
                  <b>전화번호</b> : {booth.company.contact}
                </p>
                <p>E-mail : {booth.company.email}</p>
              </div>
              {eventEBooth && isLogin && (
                <div className="stamp">
                  <input
                    type="checkbox"
                    id="출석스탬프"
                    checked={attendance}
                    readOnly
                  />
                  <label
                    htmlFor="출석스탬프"
                    onClick={() => {
                      if (!attendance) {
                        setAttendance(true);
                        event &&
                          eventEBooth &&
                          axios
                            .post(
                              `/api/conferences/1/events/${event.conferenceEventId}/ebooths/${eventEBooth.conferenceEventEboothId}/check-in`
                            )
                            .then((res) => {
                              setAttendance(true);
                              joined.current.toggleMenu();
                            });
                      } else {
                        alreadyJoined.current.toggleMenu();
                      }
                    }}
                  />
                </div>
              )}
            </div>
            <div className="scrollBox">
              <div className="downloadBox">
                <div className="download_title">브로셔 다운로드</div>
                <div className="download_list">
                  {info &&
                    info.conferenceEboothBrochures.map((v, i) => {
                      return (
                        <a
                          key={i}
                          href={v.brochure}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!v.brochure) return;
                            axios
                              .get(
                                `/api/conferences/${v.conferenceId}/ebooths/${v.conferenceEboothId}/brochures/${v.conferenceEboothBrochureId}`
                              )
                              .then((res) => {
                                download(
                                  res.data.brochure,
                                  getFileName(v.brochure)
                                );
                              });
                          }}
                        >
                          <span>{`브로셔${i + 1} 다운로드`}</span>
                          <img src="/img/icon_download.png" />
                        </a>
                      );
                    })}
                </div>
              </div>
              <div className="videoBox">{getEboothVideo()}</div>
              <div className="partner_intro">
                <div className="intro_title mgT0">회사소개</div>
                <div className="intro_text">{booth.company.description}</div>
                <div className="intro_title">제품소개</div>
                {info &&
                  info.conferenceEboothProducts.map((v, i) => {
                    return (
                      <>
                        <figure key={i}>
                          <img src={v.image} />
                        </figure>
                        <figcaption>{v.name}</figcaption>
                        <div className="intro_text mb-5">{v.content}</div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Popup ref={joined} desc={t("eBooth_joined")} />
      <Popup ref={alreadyJoined} desc={t("eBooth_alreadyJoined")} />
    </>
  );
});

export const PasswordPopup = forwardRef((props, ref) => {
  const [popupShow, setPopupShow] = useState(false);
  const [msgShow, setMsgShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const blankPopup = useRef();

  const onChangeCurrentPassword = (e) => setCurrentPassword(e.target.value);
  const onChangeNewPassword = (e) => setNewPassword(e.target.value);
  const onChangeConfirmNewPassword = (e) =>
    setConfirmNewPassword(e.target.value);

  const user = useSelector((state) => state.login.user);
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(true);
    },
  }));

  const changePasswordToSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      blankPopup.current.toggleMenu();
    }
    if (currentPassword) {
      if (newPassword !== confirmNewPassword) {
        setMsgShow(true);
        setTimeout(() => setMsgShow(false), 2000);
        return;
      }
      if (currentPassword == newPassword) {
        alert(t("foundPW_currMatch"));
        return;
      }
      axios
        .patch("/api/oauth/key", {
          authType: "email",
          identifier: user.email,
          oldKey: currentPassword,
          newKey: newPassword,
        })
        .then(() => {
          alert(t("foundPW_success"));
          setPopupShow(false);
        })
        .catch((err) =>
          alert(
            err.response.data.error.message.includes("유효하지 않은") &&
              t("foundPW_notMatch")
          )
        );
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };
  return (
    <div id="wrapper">
      {popupShow ? (
        <div id="popup_eBooth" className="layer_popup">
          <div className="popup_main">
            <a href="" onClick={handleClose} className="closeBtn">
              <img src="/img/icon_close.png" />
            </a>
            <div className="login">
              <div className="center">
                <div className="title">{t("foundPW_reset")}</div>
                <form>
                  <ul className="formBox">
                    <div className="form_title">{t("foundPW_currentPW")}</div>
                    <li>
                      <div className="inputBox">
                        <input
                          type="password"
                          placeholder={t("foundPW_currentPWInput")}
                          value={currentPassword}
                          onChange={onChangeCurrentPassword}
                        />
                      </div>
                    </li>
                    <div className="form_title">{t("foundPW_titleNew")}</div>
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
                    <div className="form_title">
                      {t("foundPW_titleConfirm")}
                    </div>
                    <li>
                      <div className="inputBox">
                        <input
                          type="password"
                          placeholder={t("foundPW_confirmInput")}
                          value={confirmNewPassword}
                          onChange={onChangeConfirmNewPassword}
                        />
                        <p
                          className="float-right mt-1"
                          style={{ color: "red", fontSize: "13px" }}
                        >
                          {msgShow ? t("foundPW_notMatch") : null}
                        </p>
                      </div>
                    </li>

                    <a
                      href=""
                      className="bottomBtn mt-5"
                      onClick={changePasswordToSubmit}
                    >
                      {t("foundPW_confirm")}
                    </a>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Popup ref={blankPopup} desc={t("eTest_blank_desc")} />
    </div>
  );
});

export const ProgramPopup = forwardRef((props, ref) => {
  const {
    conferenceId,
    conferenceScheduleId,
    conferenceScheduleSessionId,
    title,
    room,
    subject,
    companyLogo,
  } = props;
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [liveId, setLiveId] = useState(null);
  const [vodId, setVodId] = useState(null);
  const [eTest, setETest] = useState(null);
  const [enroll, setEnroll] = useState(false);
  const [userSessionBookmarkId, setUserSessionBookmarkId] = useState("");

  const [popupShow, setPopupShow] = useState(false);

  const isLogin = useSelector((state) => state.login.isLoggedIn);

  const vodJoinPopup = useRef();
  const liveJoinPopup = useRef();
  const cantJoin = useRef();
  const eTestCantJoin = useRef();
  const eTestPopup = useRef();
  const addPopup = useRef();
  const removePopup = useRef();

  const history = useHistory();

  useEffect(() => {
    const fetchInformation = async () => {
      if (popupShow) {
        console.log(conferenceScheduleSessionId);
        try {
          setLoading(true);
          setError(null);
          setInfo(null);
          setPrograms(null);
          setLiveId(null);
          setVodId(null);
          const scheduleSessionModel = new ScheduleSessionModel(
            conferenceId,
            conferenceScheduleId,
            conferenceScheduleSessionId
          );
          const conferenceLiveModel = new ConferenceLiveModel(conferenceId);
          const conferenceVodModel = new ConferenceVODModel(conferenceId);
          await scheduleSessionModel.getSessionInformation().then((res) => {
            setInfo(res);
          });
          await scheduleSessionModel
            .getProgramList()
            .then((res) => setPrograms(res.conferenceScheduleSessionPrograms));
          await conferenceLiveModel.getLiveList().then((res) => {
            for (let i = 0; i < res.conferenceLives.length; i++) {
              if (
                conferenceScheduleSessionId ===
                res.conferenceLives[i].conferenceScheduleSessionId
              ) {
                setLiveId(res.conferenceLives[i].conferenceLiveId);
                break;
              }
            }
          });
          await conferenceVodModel.getVodList().then((res) => {
            for (let i = 0; i < res.conferenceVods.length; i++) {
              if (
                conferenceScheduleSessionId ===
                res.conferenceVods[i].conferenceScheduleSessionId
              ) {
                setVodId(res.conferenceVods[i].conferenceVodId);
                break;
              }
            }
          });
        } catch (e) {
          setError(e);
        }
      }
    };
    fetchInformation();
  }, [popupShow]);

  useEffect(() => {
    const fetchBookmark = async () => {
      if (info) {
        try {
          setError(null);
          setLoading(true);
          if (isLogin) {
            const userModel = new User(authHeader);
            await userModel.getSelfUser().then((res) => {
              res.userSessionBookmarks.map((v) => {
                if (
                  parseInt(v.conferenceScheduleSessionId) ===
                  parseInt(conferenceScheduleSessionId)
                ) {
                  setUserSessionBookmarkId(v.userSessionBookmarkId);
                  setEnroll(true);
                }
              });
            });
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      }
    };
    const fetchETest = async () => {
      if (info && info.conferenceEtestId && isLogin) {
        try {
          setError(null);
          setLoading(true);
          setETest(null);
          const conferenceETestModel = new ConferenceETestModel(
            authHeader,
            conferenceId,
            info.conferenceEtestId
          );
          await conferenceETestModel.getInformation().then((res) => {
            setETest(res);
          });
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      }
    };
    fetchBookmark();
    fetchETest();
  }, [info]);

  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width:600px)" });

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(true);
    },
  }));

  const handleClose = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };

  const onClickToJoin = (e) => {
    e.preventDefault();
    const conferenceLiveVieWModel = new ConferenceLiveViewModel(
      conferenceId,
      liveId,
      authHeader
    );
    conferenceLiveVieWModel
      .getConferenceLive()
      .then((res) => {
        if (!compareDate(res.startAt, res.endAt, getNow())) {
          cantJoin.current.toggleMenu();
        } else {
          liveJoinPopup.current.toggleMenu();
        }
      })
      .catch((err) => alert(err.response.data.error.message));
  };

  const onClickToVOD = (e) => {
    e.preventDefault();
    const conferenceVODModel = new ConferenceVODModel(
      conferenceId,
      vodId,
      authHeader
    );
    conferenceVODModel.getVodInformation().then((res) => {
      if (!compareDate(res.postStartAt, res.postEndAt, getNow())) {
        cantJoin.current.toggleMenu();
      } else {
        vodJoinPopup.current.toggleMenu();
      }
    });
  };

  const onClickToETest = (e) => {
    e.preventDefault();
    if (eTest) {
      if (
        eTest.isEnabled &&
        compareDate(eTest.startAt, eTest.endAt, getNow())
      ) {
        setPopupShow(false);
        eTestPopup.current.toggleMenu();
      } else {
        eTestCantJoin.current.toggleMenu();
      }
    }
  };

  const onEnrollChange = (e) => {
    if (!enroll) {
      const body = { conferenceScheduleSessionId };
      axios
        .post("/api/user/session-bookmarks", body, authHeader)
        .then((res) => {
          setEnroll(true);
          setUserSessionBookmarkId(res.data.userSessionBookmarkId);
          addPopup.current.toggleMenu();
        })
        .catch((err) => alert(err.response.data.error.message));
    } else {
      axios
        .delete(
          `/api/user/session-bookmarks/${userSessionBookmarkId}`,
          authHeader
        )
        .then((res) => {
          setEnroll(false);
          setUserSessionBookmarkId(null);
          removePopup.current.toggleMenu();
        })
        .catch((err) => alert(err.response.data.error.message));
    }
  };

  if (loading && popupShow) return <PopupLoading />;

  if (error)
    return (
      <div id="popup_program" className="layer_popup">
        <div className="popup_main">
          <a href="" className="closeBtn" onClick={handleClose}>
            <img src="/img/icon_close.png" />
          </a>
        </div>
        <div className="popup_title">{title}</div>
        <div>에러 발생;</div>
      </div>
    );

  return (
    <>
      {popupShow ? (
        <div id="popup_program" className="layer_popup">
          {isMobile && (
            <a
              className="position-fixed"
              href=""
              onClick={handleClose}
              style={{ right: "5%", top: "6%" }}
            >
              <img src="/img/icon_close.png" />
            </a>
          )}
          <div className="popup_main">
            <a href="" className="closeBtn" onClick={handleClose}>
              <img src="/img/icon_close.png" />
            </a>
            <div className="popup_title">{title}</div>
            <div className="popup_text">
              <div className="room">{room}</div>
              <div className="subject">{subject}</div>
              <input
                type="checkbox"
                id="bookmark"
                checked={enroll}
                onChange={onEnrollChange}
              />
              <label htmlFor="bookmark">
                <span className="icon" />
              </label>
            </div>
            <div className="program_table">
              <table>
                <tbody>
                  <tr>
                    <th style={{ width: isMobile && `${width}px` }}>
                      Moderater
                    </th>
                    <td colSpan={2}>
                      {info &&
                        info.conferenceScheduleSessionModerators.map((v, i) => {
                          return (
                            <span key={i}>
                              {i > 0 && <span className="pc_only"> / </span>}
                              <b>{v.name},</b> {v.hospital}
                            </span>
                          );
                        })}
                    </td>
                  </tr>
                  {programs &&
                    programs.map((v, i) => {
                      return (
                        <tr key={i}>
                          <th style={{ width: isMobile && `${width}px` }}>
                            {v.startAt} - {v.endAt}
                          </th>
                          <td style={{ width: !isMobile && "60%" }}>
                            <p>{v.topic}</p>
                            <label
                              onClick={vodId && onClickToVOD}
                              className="cursor"
                              style={{
                                margin: isMobile
                                  ? "7px 35px 0 0"
                                  : "10px 0 0 0",
                              }}
                            >
                              VOD
                            </label>
                            {/* {vodId && (
                              <label
                                onClick={onClickToVOD}
                                className="cursor"
                                style={{ marginRight: isMobile && "45px" }}
                              >
                                VOD
                              </label>
                            )} */}
                          </td>
                          <td>
                            {v.conferenceSpeaker && (
                              <div className="speaker">
                                <div className="name">
                                  {v.conferenceSpeaker.name}
                                </div>
                                <div className="position">
                                  {v.conferenceSpeaker.department}
                                </div>
                                <div className="hospital">
                                  {v.conferenceSpeaker.hospital}
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  <tr>
                    <th style={{ width: isMobile && `${width}px` }}>
                      Partners
                    </th>
                    <td colSpan={2}>
                      <img
                        className="border"
                        src={companyLogo}
                        style={{ height: "40px" }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="btnBox">
              {liveId && (
                <a href="" className="pop-btn" onClick={onClickToJoin}>
                  입장
                </a>
              )}
              {vodId && (
                <a href="" className="pop-btn" onClick={onClickToVOD}>
                  VOD
                </a>
              )}
              {eTest && (
                <a href="" className="pop-btn" onClick={onClickToETest}>
                  E-TEST로 {">"}
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Popup
        ref={liveJoinPopup}
        desc={t("program_checkIn_desc")}
        subDesc={
          <>
            {dateFormat(new Date(), "HH:MM")}
            <br />
          </>
        }
        subDesc2={t("program_checkIn_subDesc2")}
        nextAction={() => history.push(`/live_view/${liveId}`)}
      />
      <Popup
        ref={vodJoinPopup}
        desc={t("program_checkIn_desc")}
        subDesc={
          <>
            {dateFormat(new Date(), "HH:MM")}
            <br />
          </>
        }
        subDesc2={t("program_checkIn_subDesc2")}
        nextAction={() => history.push(`/vod_view/${vodId}`)}
      />
      <AlertPopup ref={cantJoin} desc={t("program_noTime")} />
      <AlertPopup
        ref={eTestCantJoin}
        desc={t("eTest_cantJoin")}
        subDesc={`${t("eTest_cantJoin2")} ${
          eTest && dateFormat(eTest.startAt, "yyyy. mm. dd HH:MM")
        } - ${eTest && dateFormat(eTest.endAt, "HH:MM")}`}
      />
      <ETestPopup
        ref={eTestPopup}
        conferenceId={conferenceId}
        conferenceEtestId={info && info.conferenceEtestId}
        subject={subject}
        startAt={eTest && eTest.startAt}
        endAt={eTest && eTest.endAt}
      />
      <Popup
        ref={addPopup}
        desc={t("program_addSession_desc")}
        subDesc={t("program_addSession_subDesc")}
      />
      <Popup
        ref={removePopup}
        desc={t("program_removeSession_desc")}
        subDesc={t("program_removeSession_subDesc")}
      />
    </>
  );
});

export const ETestPopup = forwardRef((props, ref) => {
  const { conferenceId, conferenceEtestId, subject, startAt, endAt } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [problems, setProblems] = useState(null);
  const [eTest, setETest] = useState(null);
  const [testList, setTestList] = useState([]);
  const [userHistory, setUserhistory] = useState(null);
  const [rightCount, setRightCount] = useState(0);

  const [popupShow, setPopupShow] = useState(false);

  const submitPopup = useRef();
  const blankPopup = useRef();
  const checkNumberPopup = useRef();

  const selectedLang = useSelector((state) => state.counter.language);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchProblems = async () => {
      if (popupShow) {
        try {
          setLoading(true);
          setError(null);
          setProblems(null);
          setETest(null);
          const conferenceETestModel = await new ConferenceETestModel(
            authHeader,
            conferenceId,
            conferenceEtestId
          );
          await conferenceETestModel.getProblems().then((res) => {
            setProblems(res);
          });
          await conferenceETestModel
            .getInformation()
            .then((res) => setETest(res));
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      }
    };
    fetchProblems();
  }, [popupShow]);

  useEffect(() => {
    if (problems) {
      const eTestHistorySearch = async () => {
        try {
          setLoading(true);
          setError(null);
          setUserhistory(null);
          const user = new User(authHeader);
          let count = 0;
          await user.getETestHistories().then((res) => {
            if (res.userEtestHistories) {
              for (let i = 0; i < res.userEtestHistories.length; i++) {
                if (
                  problems.conferenceEtestsProblems[0].conferenceEtestId ===
                  res.userEtestHistories[i].conferenceEtestId
                ) {
                  setUserhistory(res.userEtestHistories[i]);
                  count++;
                  break;
                }
              }
            }
          });
          if (count <= 0) {
            await axios
              .post(
                "/api/user/etest-histories",
                {
                  problemCount: problems.count,
                  conferenceEtestId,
                },
                authHeader
              )
              .then((res) => {
                setUserhistory(res.data);
              });
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      const fetchTestList = async () => {
        try {
          setLoading(true);
          setError(null);
          setTestList(null);
          const pushingArr = [];
          await problems.conferenceEtestsProblems.map((v) => {
            pushingArr.push({
              conferenceEtestProblemId: v.conferenceEtestProblemId,
              problemType: v.problemType,
              answer: "",
            });
          });
          setTestList(pushingArr);
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      eTestHistorySearch();
      fetchTestList();
    }
  }, [problems]);

  useEffect(() => {
    if (userHistory && userHistory.status) {
      setPopupShow(false);
      alert("이미 응시한 시험입니다!");
    }
  }, [userHistory]);

  const handleUpdate = (val, index) => {
    const updateArray = testList.concat();
    updateArray[index].answer = val;
    setTestList(updateArray);
  };

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(true);
    },
  }));

  const handleClose = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };

  const onClickToSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;
    const notCorrected = [];
    const testAnswers = testList.concat();
    let blankCount = 0;
    for (let i = 0; i < testAnswers.length; i++) {
      if (!testAnswers[i].answer || testAnswers[i].answer === "") {
        blankCount++;
      }
    }
    if (blankCount > 0) {
      blankPopup.current.toggleMenu();
      return;
    }
    problems.conferenceEtestsProblems.map((v, i) => {
      if (testAnswers[i].answer === true) {
        correctCount++;
      } else if (testAnswers[i].answer === v.rightAnswer) {
        correctCount++;
      } else if (v.similarAnswer) {
        const splitedAnswer = v.similarAnswer.split(",");
        let similar = 0;
        for (let j = 0; j < splitedAnswer.length; j++) {
          if (testAnswers[i].answer.includes(splitedAnswer[j])) {
            correctCount++;
            similar++;
            break;
          }
        }
        if (similar <= 0) {
          notCorrected.push(i + 1);
        }
      } else {
        notCorrected.push(i + 1);
      }
    });
    if (eTest.isCheck) {
      if (notCorrected.length > 0) {
        if (selectedLang == "KR") {
          alert(notCorrected + " 번 답을 다시 확인해주세요.");
        } else {
          alert("Check the answer to number " + notCorrected);
        }
        return;
      }
    }
    setRightCount(correctCount);
    submitPopup.current.toggleMenu();
  };

  const confirmToSubmit = () => {
    if (userHistory) {
      axios
        .patch(
          `/api/user/etest-histories/${userHistory.userEtestHistoryId}`,
          { status: 1, rightCount },
          authHeader
        )
        .then((res) => {
          alert(t("eTest_submission"));
          setPopupShow(false);
        });
    }
  };

  if (loading && popupShow) {
    return <PopupLoading />;
  }

  if (error)
    return (
      <div id="popup_E-Test" className="layer_popup">
        <div className="popup_main">
          <a href="" className="closeBtn" onClick={handleClose}>
            <img src="/img/icon_close.png" />
          </a>
        </div>
        <div className="popup_title">에러 발생</div>
      </div>
    );

  return (
    <>
      {popupShow ? (
        <div id="popup_E-Test" className="layer_popup">
          <div className="popup_main">
            <a href="" onClick={handleClose} className="closeBtn">
              <img src="/img/icon_close.png" />
            </a>
            <div className="popup_title">E-Test</div>
            <div className="popup_text">
              <div className="subject">{subject}</div>
            </div>
            <div className="date">
              {t("eTest_period")} : {dateFormat(startAt, "yyyy. mm. dd HH:MM")}{" "}
              - {dateFormat(endAt, "yyyy. mm. dd HH:MM")}
            </div>
            <ul className="test_list">
              <div className="q_total">
                {t("eTest_total")} : {problems && problems.count}
                {t("eTest_munhang")}
              </div>
              {problems &&
                problems.conferenceEtestsProblems.map((v, i) => {
                  return (
                    <li key={i}>
                      <div className="question">{`${i + 1}. ${v.problem}`}</div>
                      {v.problemType === 0 ? (
                        <div className="inputBox">
                          <input
                            type="text"
                            placeholder="답을 입력해주세요"
                            value={testList[i].answer}
                            onChange={(e) => handleUpdate(e.target.value, i)}
                          />
                        </div>
                      ) : (
                        <div className="checkBox">
                          {v.questions.map((val, idx) => {
                            return (
                              <Fragment key={idx}>
                                <input
                                  type="radio"
                                  name={`문제${i + 1}`}
                                  id={`문제${i + 1}_정답${idx + 1}`}
                                  onChange={() => {
                                    handleUpdate(
                                      val.isRightAnswer ? true : "not",
                                      i
                                    );
                                  }}
                                />
                                <label htmlFor={`문제${i + 1}_정답${idx + 1}`}>
                                  {val.question}
                                </label>
                              </Fragment>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
            <div className="bottom_text">※ {t("eTest_submit")}</div>
            <div className="btnBox">
              <a href="" onClick={onClickToSubmit}>
                {t("submit")}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <ConfirmAlertPopup
        ref={submitPopup}
        desc={t("eTest_submit_desc")}
        subDesc={t("eTest_submit_subDesc")}
        nextAction={confirmToSubmit}
      />
      <AlertPopup ref={blankPopup} desc={t("eTest_blank_desc")} />
      <Popup ref={checkNumberPopup} desc={t("eTest_n_desc")} />
    </>
  );
});
