import { Button } from "@material-ui/core";
import dateFormat from "dateformat";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { compareDate, getNow } from "../Formatter/DateFormatter";
import { Mobile } from "../MediaQuery";
import ConferenceScheduleModel from "../model/Conference/Schedules.model";
import ConferenceSpeakersModel from "../model/Conference/Speakers.model";
import ErrorPage from "../view/ErrorPage";
import Loading from "./Loading";

const LayerPopup = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [speaker, setSpeaker] = useState(null);
  const [session, setSession] = useState(null);
  const [room, setRoom] = useState(null);
  const [live, setLive] = useState(null);

  const [show, setShow] = useState(false);
  const [abstractLink, setAbstractLink] = useState();
  const {
    conferenceId,
    conferenceSpeakerId,
    profile,
    name,
    department,
    hospital,
    isLeader,
    cv,
    country,
    abstracts,
  } = props;

  const history = useHistory();

  useEffect(() => {
    abstracts &&
      abstracts.conferenceAbstracts.map((v) => {
        if (
          v.conferenceId === 1 &&
          name.includes(v.name) &&
          hospital.includes(v.hospital)
        ) {
          setAbstractLink(v.conferenceAbstractId);
        }
      });
  }, []);

  useEffect(() => {
    if (show) {
      const fetchSpeaker = async () => {
        try {
          setLoading(true);
          setError(null);
          setSpeaker(null);
          const conferenceSpeakersModel = new ConferenceSpeakersModel(
            conferenceId,
            conferenceSpeakerId
          );
          await conferenceSpeakersModel.getSpeakerInfo().then((res) => {
            setSpeaker(res);
          });
        } catch (e) {
          setError(e);
        }
      };
      fetchSpeaker();
    }
  }, [show]);

  useEffect(() => {
    if (speaker) {
      const fetchLive = async () => {
        try {
          setLoading(true);
          setError(null);
          setLive(null);
          setRoom(null);
          if (speaker.moderatorScheduleSessions) {
            const session = speaker.moderatorScheduleSessions;
            for (let i = 0; i < session.length; i++) {
              if (
                session[i].conferenceScheduleSession &&
                session[i].conferenceScheduleSession.conferenceLive
              ) {
                const live =
                  session[i].conferenceScheduleSession.conferenceLive;
                if (compareDate(live.startAt, live.endAt, getNow())) {
                  setLive(live);
                  const conferenceScheduleModel = new ConferenceScheduleModel(
                    conferenceId,
                    session[i].conferenceScheduleSession.conferenceScheduleId,
                    session[
                      i
                    ].conferenceScheduleSession.conferenceScheduleRoomId
                  );
                  await conferenceScheduleModel
                    .getScheduleRoomInformation()
                    .then((res) => setRoom(res[0]));
                  await setSession(session[i].conferenceScheduleSession);
                  break;
                }
              }
            }
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchLive();
    }
  }, [speaker]);

  useImperativeHandle(ref, () => ({
    toggle() {
      setShow(!show);
    },
  }));

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  if (loading && show) return <></>;

  if (error && show) {
    console.log(error);
    return (
      <div id="popup_eBooth_event" className="layer_popup">
        <div className="popup_main">
          <a href="" className="closeBtn" onClick={handleClose}>
            <img src="/img/icon_close.png" />
          </a>
          <div className="popup_title">
            <ErrorPage />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {show ? (
        <div id="popup_speaker" className="layer_popup">
          <div className="popup_main">
            <a href="" className="closeBtn" onClick={handleClose}>
              <img src="/img/icon_close.png" />
            </a>
            <div className="imgBox">
              <img src={profile && profile} />
            </div>
            <div className="textBox">
              {isLeader && (
                <Button
                  className="mt-2 mb-2"
                  style={{
                    backgroundColor: "#319fdc",
                    width: "52px",
                    height: "24px",
                    color: "#fff",
                    borderRadius: "0",
                  }}
                >
                  좌장
                </Button>
              )}
              <div className="name">{name}</div>
              <div className="position">{department}</div>
              <div className="hospital">
                {hospital}, {country}
              </div>
              <div className="btnBox">
                {cv && (
                  <a href={cv} target="_blank">
                    CV
                  </a>
                )}
                {abstractLink && (
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      props.clickToHistoryPush(
                        `/abstractsview/${abstractLink}`
                      );
                    }}
                  >
                    Abstract
                  </a>
                )}
              </div>
            </div>
            {live ? (
              <div className="infoBox">
                <div className="info01">
                  {room && room.name} / {session && session.title} /{" "}
                  {`${dateFormat(live.startAt, "HH:MM")} - ${dateFormat(
                    live.endAt,
                    "HH:MM"
                  )}`}
                </div>
                <div className="info02">{live.title}</div>
                <a
                  href=""
                  className="liveBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/live");
                  }}
                >
                  Live로 이동 &nbsp; →
                </a>
              </div>
            ) : (
              <div className="infoBox">
                <div className="info01" />
                <div className="info02">
                  <a
                    href=""
                    className="liveBtn"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Live로 이동 &nbsp; →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

export default LayerPopup;
