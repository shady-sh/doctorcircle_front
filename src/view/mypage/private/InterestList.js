import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Loading from "../../../components/Loading";
import MyPage from "../../../components/MyPage";
import Pagination, { pageFilter } from "../../../components/Pagination";
import TabBox from "../../../components/TabBox";
import User from "../../../model/User/User.model";
import { authHeader } from "../../../services/auth-header";
import ErrorPage from "../../ErrorPage";

// 임시로 만들어둔 마이페이지 관심리스트 목록입니다..
// 경로: /Mypage/Private/InterestedList/Abstract   (Abstract 관심리스트를 보고 싶은 경우)
// 경로: /Mypage/Private/InterestedList/Program    (Program 관심리스트를 보고 싶은 경우)
// (로그인 상태가 아닐 경우 오류가 출력될 수 있습니다.)

export const InterestList = ({ match, history }) => {
  const [selected, setSelected] = useState(1);
  const [abstract, setAbstract] = useState();
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMobile = useMediaQuery({ query: "(max-width:600px)" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError(null);
        setAbstract(null);
        setSession(null);
        setLoading(true);
        const userModel = await new User(authHeader);
        await userModel.getSelfUser().then((res) => {
          setAbstract(res.userAbstractBookmarks);
          setSession(res.userSessionBookmarks);
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

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
    <MyPage
      element={
        <div className="subMain mypage">
          <div className="center">
            <TabBox />
            <div className="sorting">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/mypage/private/interestedlist/program");
                  setSelected(1);
                }}
                className={
                  match.params.name.toLowerCase() == "program"
                    ? "program on"
                    : "program"
                }
              >
                Program
              </a>
              <span>/</span>
              <a
                href="/Mypage/Private/InterestedList/Abstract"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/mypage/private/interestedlist/abstract");
                  setSelected(1);
                }}
                className={
                  match.params.name.toLowerCase() == "abstract"
                    ? "abstracts on"
                    : "abstracts"
                }
              >
                Abstracts
              </a>
            </div>
            <div className="mypage_table">
              {match.params.name.toLowerCase() == "program" ? (
                <table className="tb02 mypage_program">
                  <thead>
                    <tr>
                      <th className="number" style={{ width: "180px" }}>
                        Date
                      </th>
                      <th className="pc_only">Time</th>
                      <th className="pc_only">Room</th>
                      <th className="subject" style={{ width: "680px" }}>
                        Session Title
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {session &&
                      session.map((v, i) => {
                        if (pageFilter(i, selected))
                          return (
                            <tr
                              key={i}
                              className="cursor"
                              onClick={() => history.push("/program")}
                            >
                              <td>
                                {dateFormat(
                                  v.conferenceScheduleSession.startAt,
                                  "yyyy. mm. dd"
                                )}
                              </td>
                              <td className="pc_only">
                                {dateFormat(
                                  v.conferenceScheduleSession.startAt,
                                  "HH:MM"
                                )}{" "}
                                ~{" "}
                                {dateFormat(
                                  v.conferenceScheduleSession.endAt,
                                  "HH:MM"
                                )}
                              </td>
                              <td className="pc_only">Room 1</td>
                              <td className="subject">
                                <div className="m_only">
                                  <span className="mr-3">
                                    {dateFormat(
                                      v.conferenceScheduleSession.startAt,
                                      "HH:MM"
                                    )}{" "}
                                    -{" "}
                                    {dateFormat(
                                      v.conferenceScheduleSession.endAt,
                                      "HH:MM"
                                    )}
                                  </span>
                                  <span className="room">Room: Room 1</span>
                                </div>
                                {isMobile && <br />}
                                {v.conferenceScheduleSession.title}
                              </td>
                            </tr>
                          );
                      })}
                  </tbody>
                </table>
              ) : (
                <table className="tb02 mypage_abstracts">
                  <thead>
                    <tr>
                      <th className="number" style={{ width: "180px" }}>
                        NO.
                      </th>
                      <th className="pc_only">Speaker</th>
                      <th className="subject" style={{ width: "680px" }}>
                        Title
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {abstract &&
                      abstract.map((v, i) => {
                        if (pageFilter(i, selected)) {
                          return (
                            <tr
                              key={i}
                              className="cursor"
                              onClick={() =>
                                history.push(
                                  `/abstractsview/${v.conferenceAbstractId}`
                                )
                              }
                            >
                              <td>{v.conferenceAbstract.code}</td>
                              <td className="pc_only">
                                <div className="name">
                                  {v.conferenceAbstract.name}
                                </div>
                                <div className="hospital">
                                  {v.conferenceAbstract.hospital}
                                </div>
                              </td>
                              <td className="subject">
                                <div className="m_only">
                                  <span className="name">
                                    {v.conferenceAbstract.name}
                                  </span>
                                  <span className="hospital">
                                    {v.conferenceAbstract.hospital}
                                  </span>
                                </div>
                                {isMobile && <br />}
                                {v.conferenceAbstract.title}
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>
              )}
            </div>
            <Pagination
              count={
                match.params.name.toLowerCase() == "program"
                  ? session && session.length
                  : abstract && abstract.length
              }
              selected={(pageSelect) => setSelected(pageSelect)}
            />
          </div>
        </div>
      }
    />
  );
};
