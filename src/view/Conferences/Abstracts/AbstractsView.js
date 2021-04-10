import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import dateformat from "dateformat";
import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import { Popup } from "../../../components/Popup";
import ConferenceAbstractsModel from "../../../model/Conference/Abstracts.model";
import { useMediaQuery } from "react-responsive";
import User from "../../../model/User/User.model";
import { authHeader } from "../../../services/auth-header";
import axios from "axios";
import { download, downloadFile } from "../../../components/Download";
import { getFileName } from "../../../Formatter/FileName";
import Loading from "../../../components/Loading";
import ErrorPage from "../../ErrorPage";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ConferenceAbstractsView = ({ history, match }) => {
  const { conferenceAbstractId } = match.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [abstractInfo, setAbstractInfo] = useState();
  const [enroll, setEnroll] = useState(false);
  const [userAbstractBookmarkId, setUserAbstractBookmarkId] = useState("");

  const popupRef = useRef();
  const removePopupRef = useRef();

  const isLogin = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    const fetchAbstractInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        setAbstractInfo(null);
        setEnroll(null);
        setUserAbstractBookmarkId(null);
        const conferenceAbstractsModel = new ConferenceAbstractsModel(
          1,
          conferenceAbstractId
        );
        await conferenceAbstractsModel
          .getConferenceAbstract()
          .then(async (res) => setAbstractInfo(res));
        if (isLogin) {
          const userModel = new User(authHeader);
          await userModel.getSelfUser().then((res) => {
            res.userAbstractBookmarks.map((v) => {
              if (
                parseInt(conferenceAbstractId) ===
                parseInt(v.conferenceAbstractId)
              ) {
                setUserAbstractBookmarkId(v.userAbstractBookmarkId);
                setEnroll(true);
              }
            });
          });
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchAbstractInfo();
  }, []);

  const clickToPrevPage = (e) => {
    e.preventDefault();
    history.push(`/abstracts`);
  };

  const onEnrollChange = (e) => {
    if (!enroll) {
      const body = { conferenceAbstractId };
      axios
        .post("/api/user/abstract-bookmarks", body, authHeader)
        .then((res) => {
          setEnroll(true);
          setUserAbstractBookmarkId(res.data.userAbstractBookmarkId);
          popupRef.current.toggleMenu();
        })
        .catch((err) => alert(err.response.data.error.message));
    } else {
      axios
        .delete(
          `/api/user/abstract-bookmarks/${userAbstractBookmarkId}`,
          authHeader
        )
        .then((res) => {
          setEnroll(false);
          setUserAbstractBookmarkId(null);
          removePopupRef.current.toggleMenu();
        })
        .catch((err) => alert(err.response.data.error.message));
    }
  };

  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width:600px)" });

  if (loading)
    return (
      <Header
        element={
          <div className="subArea">
            <Banner title="Abstracts" />
            <div className="subMain board">
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
            <Banner title="Abstracts" />
            <div className="subMain board">
              <div className="center">
                <div className="board_view">
                  <div className="board_top">
                    <div className="subject">
                      {abstractInfo && abstractInfo.title}
                    </div>
                    <div className="name">
                      {abstractInfo && abstractInfo.name}
                    </div>
                    <div className="hospital">
                      {abstractInfo && abstractInfo.hospital}
                    </div>
                    <div className="date">
                      {abstractInfo &&
                        dateformat(abstractInfo.createdAt, "yyyy. mm. dd	")}
                    </div>
                    <div className="rightBox">
                      <span>
                        조회 수 : {abstractInfo && abstractInfo.viewCount}
                      </span>
                      {isLogin && (
                        <>
                          <input
                            type="checkbox"
                            id="bookmark"
                            checked={enroll}
                            onChange={onEnrollChange}
                          />
                          <label htmlFor="bookmark">
                            <span className="icon"></span>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="board_contents" style={{ whiteSpace: "pre" }}>
                    {abstractInfo && abstractInfo.content}
                  </div>
                  {abstractInfo &&
                    abstractInfo.conferenceAbstractFiles.length > 0 && (
                      <div className="board_bottom">
                        <span className="file_title">첨부파일</span>
                        {abstractInfo.conferenceAbstractFiles.map((v, i) => {
                          console.log(v.file);
                          return (
                            <span key={i}>
                              <span className="file_name" key={i}>
                                {v.name}
                              </span>
                              <a
                                href={v.file}
                                className={`download ${isMobile && "mr-2"}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  download(v.file, getFileName(v.name));
                                }}
                              >
                                다운로드
                              </a>
                            </span>
                          );
                        })}
                      </div>
                    )}
                </div>
                <div className="bottomBtn">
                  <a href="abstracts.php" onClick={clickToPrevPage}>
                    {t("list")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Popup
        ref={popupRef}
        desc={t("AbstractsView_addInterestDesc")}
        subDesc={t("AbstractsView_addInterestDesc2")}
      />
      <Popup
        ref={removePopupRef}
        desc={t("AbstractsView_removeInterestDesc")}
        subDesc={t("AbstractsView_removeInterestDesc2")}
      />
    </>
  );
};
