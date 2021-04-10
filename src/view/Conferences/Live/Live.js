import { useEffect, useRef, useState } from "react";
import dateformat from "dateformat";
import Banner from "../../../components/Banner";
import Datepicker from "../../../components/Datepicker";
import Header from "../../../components/Header";
import ConferenceLiveModel from "../../../model/Conference/Live.model";
import ErrorPage from "../../ErrorPage";
import {
  compareDate,
  getNow,
  includeDate,
} from "../../../Formatter/DateFormatter";
import { useSelector } from "react-redux";
import { AlertPopup, Popup } from "../../../components/Popup";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import CompanyModel from "../../../model/Company.model";

const ConferenceLive = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liveList, setLiveList] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const { t } = useTranslation();

  const isLogin = useSelector((state) => state.login.isLoggedIn);

  const unjoinable = useRef();
  const joinable = useRef([]);

  useEffect(() => {
    const fetchLiveList = async () => {
      try {
        setLoading(true);
        setError(null);
        setLiveList(null);
        const conferenceLiveModel = new ConferenceLiveModel(1);
        await conferenceLiveModel.getLiveList().then(async (data) => {
          const copyData = data.conferenceLives;
          await copyData.map((v) => {
            const companyModel = new CompanyModel(
              v.conferenceScheduleSession.companyId
            );
            companyModel.getCompany().then((res) => (v.company = res.logo));
          });
          setLiveList(copyData);
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchLiveList();
  }, []);

  useEffect(() => {
    console.log(liveList);
  }, [liveList]);

  const clicktoEnterRoom = (e, value) => {
    e.preventDefault();
    if (!isLogin) {
      history.push("/login");
      return;
    }
    if (!compareDate(value.startAt, value.endAt, getNow())) {
      unjoinable.current.toggleMenu();
      return;
    }
    joinable.current[value.conferenceLiveId].toggleMenu();
  };

  let count = 0;

  if (loading)
    return (
      <Header
        element={
          <div className="subArea">
            <Banner title="LIVE" />
            <div className="subMain live">
              <div className="center">
                <Loading />
              </div>
            </div>
          </div>
        }
      />
    );

  if (error) return <ErrorPage />;

  try {
    return (
      <>
        <Header
          element={
            <div className="subArea">
              <Banner title="LIVE" />
              <div className="subMain live">
                <div className="center">
                  <Datepicker currentDate={(date) => setSelectedDate(date)} />
                  <ul className="live_list">
                    {liveList &&
                      liveList.map((v, i) => {
                        if (
                          v.isEnabled &&
                          v.isPublic &&
                          includeDate(v.startAt, v.endAt, selectedDate)
                        ) {
                          count++;
                          return (
                            <li key={i}>
                              <div className="item">
                                <div
                                  className="imgBox"
                                  style={{
                                    backgroundImage: `url(/img/liveimg${
                                      Math.floor(Math.random() * 3) + 1
                                    }.png`,
                                  }}
                                >
                                  <a
                                    href=""
                                    className="play"
                                    onClick={(e) => {
                                      clicktoEnterRoom(e, v);
                                    }}
                                  >
                                    <img src="/img/icon_play.png" />
                                  </a>
                                  <label>
                                    {
                                      v.conferenceScheduleSession
                                        .conferenceScheduleRoom.name
                                    }
                                  </label>
                                </div>
                                <div className="textBox">
                                  <div className="subject">{v.title}</div>
                                  <div className="name">
                                    {v.conferenceScheduleSession
                                      .conferenceScheduleSessionModerators &&
                                      v.conferenceScheduleSession
                                        .conferenceScheduleSessionModerators[0]
                                        .name}
                                  </div>
                                  <div className="position">
                                    {v.conferenceScheduleSession
                                      .conferenceScheduleSessionModerators &&
                                      v.conferenceScheduleSession
                                        .conferenceScheduleSessionModerators[0]
                                        .department}
                                  </div>
                                  <div className="hospital">
                                    {v.conferenceScheduleSession
                                      .conferenceScheduleSessionModerators &&
                                      v.conferenceScheduleSession
                                        .conferenceScheduleSessionModerators[0]
                                        .hospital}
                                  </div>
                                  <div className="date">
                                    {dateformat(v.startAt, "yyyy-mm-dd HH:MM")}{" "}
                                    - {dateformat(v.endAt, "HH:MM")}
                                  </div>
                                  {v.company && (
                                    <img
                                      src={v.company}
                                      className="partner_logo border"
                                    />
                                  )}
                                </div>
                              </div>
                              {compareDate(v.startAt, v.endAt, getNow()) ? (
                                <a
                                  href=""
                                  onClick={(e) => {
                                    clicktoEnterRoom(e, v);
                                  }}
                                  className="live-btn"
                                >
                                  입장하기
                                </a>
                              ) : (
                                <a
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                  className="live-btn"
                                >
                                  입장불가
                                </a>
                              )}
                            </li>
                          );
                        }
                      })}
                  </ul>
                  {count <= 0 && (
                    <h3 className="text-center live-h3">
                      <br />
                      진행중인 LIVE가 없습니다.
                    </h3>
                  )}
                </div>
              </div>
            </div>
          }
        />
        <AlertPopup ref={unjoinable} desc={t("program_noTime")} />
        {liveList &&
          liveList.map((v, i) => {
            return (
              <Popup
                key={i}
                ref={(el) => (joinable.current[v.conferenceLiveId] = el)}
                desc={t("program_checkIn_desc")}
                subDesc={
                  <>
                    {dateformat(new Date(), "HH:MM")}
                    <br />
                  </>
                }
                subDesc2={t("program_checkIn_subDesc2")}
                nextAction={() =>
                  history.push(`/live_view/${v.conferenceLiveId}`)
                }
              />
            );
          })}
      </>
    );
  } catch (e) {
    console.log(e);
    return (
      <Header
        element={
          <div className="subArea">
            <Banner title="LIVE" />
            <div className="subMain live">
              <div className="center">
                <Datepicker currentDate={(date) => setSelectedDate(date)} />
                <Loading />
              </div>
            </div>
          </div>
        }
      />
    );
  }
};

export default ConferenceLive;
