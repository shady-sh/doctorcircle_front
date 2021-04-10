import { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { getToday, includeDate } from "../../Formatter/DateFormatter";
import Datepicker from "../../components/Datepicker";
import Header from "../../components/Header";
import LayerPopup from "../../components/LayerPopup";
import Banner from "../../components/Banner";
import ConferenceSpeakersModel from "../../model/Conference/Speakers.model";
import ConferenceAbstractsModel from "../../model/Conference/Abstracts.model";
import ErrorPage from "../ErrorPage";
import Loading from "../../components/Loading";
import { Mobile } from "../../MediaQuery";
import axios from "axios";
import ScheduleSessionModel from "../../model/Conference/ScheduleSession.model";

// Speakers 페이지
// 경로: /Speakers
const ConferenceSpeakers = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [speakerLists, setSpeakersList] = useState(null);
  const [dateSpeakers, setDateSpeakers] = useState(null);
  const [abstracts, setAbstracts] = useState();
  const [selectedDate, setSelectedDate] = useState(getToday());

  const speakerPopup = useRef([]);

  const isMobile = Mobile();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setLoading(true);
        setError(null);
        setSpeakersList(null);
        setAbstracts(null);
        const conferenceSpeakersModel = new ConferenceSpeakersModel(1);
        const conferenceAbstractsModel = new ConferenceAbstractsModel(1);
        await conferenceSpeakersModel
          .getSpeakerList()
          .then((data) => setSpeakersList(data.conferenceSpeakers));
        await conferenceAbstractsModel
          .getConferenceAbstractList()
          .then((data) => setAbstracts(data));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchSpeakers();
  }, []);

  // useEffect(() => {
  //   if (speakerLists) {
  //     const fetchDateSpeakers = async () => {
  //       try {
  //         setLoading(true);
  //         setError(null);
  //         setDateSpeakers(null);
  //         const filterSpeaker = [];
  //         await speakerLists.map((value) => {
  //           const { speakerScheduleSessionPrograms } = value;
  //           if (
  //             speakerScheduleSessionPrograms &&
  //             speakerScheduleSessionPrograms.length > 0
  //           ) {
  //             const program = speakerScheduleSessionPrograms[0];
  //             const {
  //               conferenceScheduleId,
  //               conferenceScheduleSessionId,
  //             } = program;
  //             conferenceScheduleId &&
  //               conferenceScheduleSessionId &&
  //               axios
  //                 .get(
  //                   `/api/conferences/${value.conferenceId}/schedules/${conferenceScheduleId}/sessions/${conferenceScheduleSessionId}`
  //                 )
  //                 .then((res) => {
  //                   filterSpeaker.push({
  //                     ...value,
  //                     startAt: res.data.startAt,
  //                     endAt: res.data.endAt,
  //                   });
  //                 });
  //           }
  //         });
  //         setDateSpeakers(filterSpeaker);
  //       } catch (e) {
  //         setError(e);
  //       }
  //       setLoading(false);
  //     };
  //     fetchDateSpeakers();
  //   }
  // }, [speakerLists]);

  const handleOpenPopup = (e, id) => {
    e.preventDefault();
    speakerPopup.current[id].toggle();
  };

  const currentDate = (data) => {
    setSelectedDate(data);
  };

  const clickToHistoryPush = (link) => {
    history.push(link);
  };

  if (loading)
    return (
      <Header
        element={
          <div className="subArea">
            <Banner title="Speakers" />
            <div className="subMain speakers">
              <div className="center">
                <Loading />
              </div>
            </div>
          </div>
        }
      />
    );

  if (error) return <ErrorPage />;

  return (
    <>
      <Header
        element={
          <div className="subArea">
            <Banner title="Speakers" />
            <div className="subMain speakers">
              <div className="center">
                <Datepicker currentDate={currentDate} />
                <ul className="speakers_list">
                  {speakerLists &&
                    speakerLists.map((v, i) => {
                      if (v.moderatorScheduleSessions.length > 0) {
                        return (
                          <li
                            className={
                              v.moderatorScheduleSessions.length > 0
                                ? "leader cursor"
                                : "cursor"
                            }
                            onClick={(e) => {
                              handleOpenPopup(e, i);
                            }}
                            key={i}
                          >
                            <div className="label">
                              {v.moderatorScheduleSessions.length > 0 && "좌장"}
                            </div>
                            <div className="imgBox">
                              <img src={v.profile} />
                            </div>
                            <div className="textBox">
                              <div className="name">{v.name}</div>
                              <div className="position">{v.department}</div>
                              <div
                                className={`hospital ${
                                  v.hospital.length < 32 && !isMobile && "mb-3"
                                }`}
                              >
                                {v.hospital}
                              </div>
                              <a
                                href=""
                                className="butn"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                자세히보기
                                <img
                                  src="/img/icon_right.png"
                                  className="mr-5"
                                />
                              </a>
                            </div>
                          </li>
                        );
                      }
                    })}
                  {speakerLists &&
                    speakerLists.map((v, i) => {
                      if (
                        v.moderatorScheduleSessions.length <= 0 ||
                        !v.moderatorScheduleSessions
                      ) {
                        return (
                          <li
                            className={
                              v.moderatorScheduleSessions.length > 0
                                ? "leader cursor"
                                : "cursor"
                            }
                            onClick={(e) => {
                              handleOpenPopup(e, i);
                            }}
                            key={i}
                          >
                            <div className="label">
                              {v.moderatorScheduleSessions.length > 0 && "좌장"}
                            </div>
                            <div className="imgBox">
                              <img src={v.profile} />
                            </div>
                            <div className="textBox">
                              <div className="name">{v.name}</div>
                              <div className="position">{v.department}</div>
                              <div
                                className={`hospital ${
                                  v.hospital.length < 32 && !isMobile && "mb-3"
                                }`}
                              >
                                {v.hospital}
                              </div>
                              <a
                                href=""
                                className="butn"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                자세히보기
                                <img
                                  src="/img/icon_right.png"
                                  className="mr-5"
                                />
                              </a>
                            </div>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
          </div>
        }
      />
      {speakerLists &&
        speakerLists.map((v, i) => {
          return (
            <LayerPopup
              key={i}
              conferenceId={1}
              conferenceSpeakerId={v.conferenceSpeakerId}
              ref={(el) => (speakerPopup.current[i] = el)}
              profile={v.profile}
              name={v.name}
              department={v.department}
              cv={v.cvUrl}
              hospital={v.hospital}
              country={v.country}
              abstracts={abstracts && abstracts}
              clickToHistoryPush={clickToHistoryPush}
              isLeader={v.moderatorScheduleSessions.length > 0 ? true : false}
            />
          );
        })}
    </>
  );
};

export default withRouter(ConferenceSpeakers);
