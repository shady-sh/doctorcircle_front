import dateFormat from "dateformat";
import {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { compareDate, getNow } from "../../Formatter/DateFormatter";
import ConferenceEventModel from "../../model/Conference/Event.model";
import { authHeader } from "../../services/auth-header";
import ErrorPage from "../../view/ErrorPage";
import Loading from "../Loading";
import { EBoothPopup } from "../Popup";

export const ConferenceEBoothEventPopup = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const [popup, setPopup] = useState(null);
  const [eventBooths, setEventBooths] = useState(null);

  const [popupShow, setPopupShow] = useState(false);

  const eBoothPopup = useRef([]);

  useEffect(() => {
    if (popupShow) {
      const fetchEvents = async () => {
        try {
          setLoading(true);
          setError(null);
          setEvent(null);
          const conferenceEventModel = new ConferenceEventModel();
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
      };
      fetchEvents();
    }
  }, [popupShow]);

  useEffect(() => {
    if (event) {
      const fetchPopup = async () => {
        try {
          setLoading(true);
          setError(null);
          setPopup(null);
          setEventBooths(null);
          const conferenceEventModel = new ConferenceEventModel();
          await conferenceEventModel
            .getEventPopupList(1, event.conferenceEventId)
            .then((res) => {
              for (let i = 0; i < res.conferenceEventPopups.length; i++) {
                setPopup(res.conferenceEventPopups[i]);
                break;
              }
            });
          await conferenceEventModel
            .getEventEbooths(1, event.conferenceEventId, authHeader)
            .then((res) => setEventBooths(res.conferenceEventEbooths));
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchPopup();
    }
  }, [event]);

  const isEventJoin = (booth) => {
    if (booth && booth.userEventHistories) {
      for (let i = 0; i < booth.userEventHistories.length; i++) {
        return true;
      }
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setPopupShow(true);
    },
  }));

  const handleOpenRoom = (e, id) => {
    e.preventDefault();
    setPopupShow(false);
    eBoothPopup.current[id].toggleMenu();
  };

  const handleClose = (e) => {
    e.preventDefault();
    setPopupShow(false);
  };

  if (loading && popupShow)
    return (
      <div id="popup_eBooth_event" className="layer_popup">
        <div className="popup_main">
          <a href="" className="closeBtn" onClick={handleClose}>
            <img src="/img/icon_close.png" />
          </a>
          <div className="popup_title">
            <Loading />
          </div>
        </div>
      </div>
    );

  if (error && popupShow) {
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
      {popupShow ? (
        <div id="popup_eBooth_event" className="layer_popup">
          <div className="popup_main">
            <a href="" className="closeBtn" onClick={handleClose}>
              <img src="/img/icon_close.png" />
            </a>
            <div className="popup_title">E-Booth 이벤트</div>
            <div className="eventBox">
              <div className="event_title">{popup && popup.title}</div>
              <div className="event_date">
                이벤트 기간 :{" "}
                {`${event && dateFormat(event.startAt, "yyyy. mm. dd")} ~ ${
                  event && dateFormat(event.endAt, "yyyy. mm. dd")
                }`}
              </div>
              <div className="event_img">
                {popup &&
                  popup.rewardImage.map((v, i) => {
                    return (
                      <figure key={i}>
                        <img src={v} />
                      </figure>
                    );
                  })}
                <div className="text mt-3">
                  [{popup && popup.rewardTitle}]
                  <br />
                  <br />
                  {popup && popup.rewardDescription}
                </div>
              </div>

              <ul className="stamp_list">
                {eventBooths &&
                  eventBooths.map((v, i) => {
                    return (
                      <li
                        key={i}
                        className="cursor"
                        onClick={(e) => handleOpenRoom(e, v.conferenceEboothId)}
                      >
                        <div className="name">
                          {v.conferenceEbooth.company.name}
                        </div>
                        <input
                          type="radio"
                          id={`stamp${i}`}
                          checked={isEventJoin(v) && true}
                          readOnly
                        />
                        <label htmlFor={`stamp${i}`} />
                        <figure className="logo">
                          <img
                            src={v.conferenceEbooth.company.logo}
                            className="border w-100"
                            style={{ height: "50px" }}
                          />
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
      {eventBooths &&
        eventBooths.map((v, i) => {
          return (
            <EBoothPopup
              key={i}
              ref={(el) => (eBoothPopup.current[v.conferenceEboothId] = el)}
              booth={v.conferenceEbooth}
            />
          );
        })}
    </>
  );
});
