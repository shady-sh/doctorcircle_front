import MyPage from "../../../components/MyPage";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import dateFormat from "dateformat";
import TabBox from "../../../components/TabBox";
import Datepicker from "../../../components/Datepicker";
import { useTranslation } from "react-i18next";
import User from "../../../model/User/User.model";
import { authHeader } from "../../../services/auth-header";
import { useSelector } from "react-redux";
import ErrorPage from "../../ErrorPage";
import { getToday } from "../../../Formatter/DateFormatter";
import Loading from "../../../components/Loading";
import axios from "axios";
import PopupLoading from "../../../components/PopupLoading";
import { useMediaQuery } from "react-responsive";

export const ParticipationHistory = ({ history, match }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLive, setUserLive] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getToday());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError(null);
        setUserLive(null);
        setLoading(true);
        const userModel = await new User(authHeader);
        await userModel.getSelfUser().then(res => {
          setUserLive(res.userLiveHistories);
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    try {
      setError(null);
      let minuteCalculate = 0;
      userLive.map(v => {
        minuteCalculate = minuteCalculate + v.completeTime;
      });
      setTotalMinutes(minuteCalculate);
    } catch (e) {
      setError(e);
    }
  }, [userLive]);

  const historyPopupRef = useRef();
  const { t } = useTranslation();

  const user = useSelector(state => state.login.user);

  const clickToOpenPopup = e => {
    e.preventDefault();
    historyPopupRef.current.toggleMenu();
  };

  if (loading)
    return (
      <MyPage
        element={
          <div className="subMain mypage">
            <div className="center">
              <TabBox />
              <Loading />
            </div>
          </div>
        }
      />
    );

  if (error) return <ErrorPage />;

  return (
    <>
      <MyPage
        element={
          <div className="subMain mypage">
            <div className="center">
              <TabBox />
              <div className="summary">
                <div className="name">{user && user.name}님</div>
                <ul>
                  <li>
                    <div className="left">{t("myPage_par_totalHour")}</div>
                    <div className="right">
                      <b>{totalMinutes}</b>
                      {t("myPage_par_totalM")}
                    </div>
                  </li>
                  <li>
                    <div className="left">{t("myPage_par_totalPoint")}</div>
                    <div className="right">
                      <b>{totalMinutes && Math.floor(totalMinutes / 60)}</b>
                      {t("myPage_par_totalPointNumber")}
                      <p>{t("myPage_par_totalPointAlert")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="left">{t("myPage_par_eTest")}</div>
                    <a
                      href=""
                      className="e-test-btn"
                      onClick={clickToOpenPopup}
                    >
                      {t("myPage_par_eTestBtn")}
                    </a>
                  </li>
                </ul>
                <div className="notice">
                  · Break Time은 제외된 시간입니다.
                  <br />
                  · 참여 후 익일 참여시간 및 예상 평점 확인이 가능합니다.
                  <br />
                  · 해당 내역으로 대한의사협회에 보고됩니다.
                  <br />
                </div>
                <div className="notice2">
                  {t("myPage_par_inqur")}{" "}
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      history.push("/mypage/private/qna");
                    }}
                  >
                    {t("myPage_par_inqur2")}
                  </a>
                  {t("myPage_par_inqur3")}
                </div>
              </div>

              <Datepicker currentDate={date => setSelectedDate(date)} />

              <div className="mypage_table">
                <table className="tb02">
                  <thead>
                    <tr>
                      <th className="subject" style={{ width: "680px" }}>
                        Title
                      </th>
                      <th className="pc_only">Check In</th>
                      <th className="pc_only">Check Out</th>
                      <th>Complete Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLive &&
                      userLive.map((v, i) => {
                        if (
                          v.entranceAt.includes(selectedDate) &&
                          v.completeTime
                        ) {
                          return (
                            <tr key={i}>
                              <td className="subject">
                                {v.conferenceLive.title}
                              </td>
                              <td className="pc_only">
                                {dateFormat(v.entranceAt, "HH:MM")}
                              </td>
                              <td className="pc_only">
                                {dateFormat(v.exitAt, "HH:MM")}
                              </td>
                              <td>
                                {v.completeTime}
                                {t("myPage_par_totalM")}
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
      />
      <TestHistory ref={historyPopupRef} />
    </>
  );
};

const TestHistory = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(null);

  const isMobile = useMediaQuery({ query: "(max-width:600px)" });

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setShow(!show);
    },
  }));

  useEffect(() => {
    if (show) {
      const fetchETestHistory = async () => {
        try {
          setLoading(true);
          setError(null);
          setHistory(null);
          await axios
            .get(`/api/user/etest-histories`, authHeader)
            .then(res => setHistory(res.data))
            .catch(err => alert(err.response.data.error.message));
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchETestHistory();
    }
  }, [show]);

  const handleClick = e => {
    e.preventDefault();
    setShow(!show);
  };

  if (loading) return <PopupLoading />;

  return (
    <>
      {show ? (
        <div id="popup_eTest_history" className="layer_popup">
          <div className="popup_main">
            <a href="" className="closeBtn" onClick={handleClick}>
              <img src="/img/icon_close.png" />
            </a>
            <div className="popup_title">E-TEST 내역</div>
            <div className="history">
              <table>
                <thead>
                  <tr>
                    <th className="pc_only">NO.</th>
                    <th>세션명</th>
                    <th style={{ width: "30%" }}>진행일자</th>
                    <th className="pc_only">참여현황</th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.userEtestHistories.map((v, i) => {
                      if (v.status)
                        return (
                          <tr key={i}>
                            <td className="pc_only">{history.count - i}</td>
                            <td>
                              <div className="state">
                                제출완료 [{v.rightCount}/{v.problemCount}]
                              </div>
                              {v.conferenceEtest.title}
                            </td>
                            <td>
                              {dateFormat(
                                v.conferenceEtest.endAt,
                                "yyyy. mm. dd"
                              )}
                            </td>
                            <td className="pc_only">
                              <div className="mb-1">
                                <font color="#319fdc">제출완료</font>
                              </div>
                              <div>
                                <font color="#319fdc">
                                  {v.rightCount}/{v.problemCount}
                                </font>
                              </div>
                            </td>
                          </tr>
                        );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
});
