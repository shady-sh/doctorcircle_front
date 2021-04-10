import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import dateformat from "dateformat";
import Loading from "../../../components/Loading";
import MyPage from "../../../components/MyPage";
import ConferenceQnaModel from "../../../model/Conference/Qna.model";
import { authHeader } from "../../../services/auth-header";
import ConferenceFAQModel from "../../../model/Conference/FAQ.model";
import Pagination, { pageFilter } from "../../../components/Pagination";
import SearchBox from "../../../components/SearchBox";

const Qna = ({ match, history }) => {
  const isLogin = useSelector((state) => state.login.isLoggedIn);

  const [faqSelect, setFaqSelect] = useState(1);
  const [inquirySelect, setInquirySelect] = useState(1);
  const [selectSearch, setSelectSearch] = useState("ALL");
  const [searchField, setSearchField] = useState("");
  const [search, setSearch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inquiryList, setInquiryList] = useState();
  const [faqList, setFAQList] = useState();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
      return;
    }
    const fetchInquiryList = async () => {
      try {
        setLoading(true);
        setError(null);
        setInquiryList(null);
        setFAQList(null);
        const conferenceQnaModel = new ConferenceQnaModel(authHeader, 1);
        const conferenceFAQModel = new ConferenceFAQModel(1);
        await conferenceQnaModel.getConferenceInquiryList().then((res) => {
          const newArr = res;
          newArr.conferenceInquiries[
            newArr.conferenceInquiries.length -
              newArr.conferenceInquiries.length
          ].new = true;
          setInquiryList(newArr);
        });
        await conferenceFAQModel.getFAQLIst().then((res) => {
          const newArr = res;
          newArr.conferenceFaqs[
            newArr.conferenceFaqs.length - newArr.conferenceFaqs.length
          ].new = true;
          setFAQList(newArr);
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchInquiryList();
  }, []);

  const { t } = useTranslation();

  const onChangeSearchfield = (e) => setSearchField(e.target.value);
  const clickToSearch = (e) => {
    if (e) e.preventDefault();
    setSearch(true);
  };

  const faqReturnTable = (v, i) => {
    return (
      <tr key={i}>
        <td className="pc_only">{faqList.count - i}</td>
        <td style={{ textAlign: "left" }}>
          <div className="state" />
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              history.push({
                pathname: `/mypage/private/faq_view`,
                state: {
                  title: v.title,
                  date: v.createdAt,
                  content: v.content,
                  files: v.files,
                },
              });
            }}
          >
            [FAQ] {v.title}{" "}
            {v.new && (
              <img src="../../img/icon_new.svg" className="new" width="15px" />
            )}
          </a>
        </td>
        <td>{dateformat(v.createdAt, "yyyy. mm. dd")}</td>
      </tr>
    );
  };

  const returnTable = (v, i) => {
    return (
      <tr key={i}>
        <td className="pc_only">{inquiryList.count - i}</td>
        <td style={{ textAlign: "left" }}>
          <div className="state">
            {v.isComplete ? (
              <font color="#319fdc">[답변완료]</font>
            ) : (
              "[답변대기]"
            )}
          </div>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              history.push({
                pathname: `/mypage/private/qna_view`,
                state: {
                  conferenceInquiryId: v.conferenceInquiryId,
                  name: v.user.name,
                  topic: v.topic,
                  title: v.title,
                  createdAt: dateformat(v.createdAt, "yyyy. mm. dd"),
                  content: v.content,
                  isComplete: v.isComplete,
                  reply: v.conferenceInquiryReply,
                },
              });
            }}
          >
            [{v.topic}] {v.title}{" "}
            {v.new && (
              <img src="../../img/icon_new.svg" className="new" width="15px" />
            )}
          </a>
        </td>
        <td>{dateformat(v.createdAt, "yyyy. mm. dd")}</td>
        <td className="pc_only">
          {v.isComplete ? (
            <font color="#319fdc">[답변완료]</font>
          ) : (
            "[답변대기]"
          )}
        </td>
      </tr>
    );
  };

  if (loading)
    return (
      <MyPage
        title="1:1 Inquiry"
        element={
          <div className="subMain board mypage">
            <div className="center">
              <Loading />
            </div>
          </div>
        }
      />
    );

  if (error) return <MyPage />;

  return (
    <MyPage
      title="1:1 Inquiry"
      element={
        <div className="subMain board mypage">
          <div className="center">
            <SearchBox
              value={searchField}
              onChange={onChangeSearchfield}
              onClick={clickToSearch}
              onEnter={clickToSearch}
              options={["ALL", "회원정보", "이수시간(평점)", "이벤트", "기타"]}
              select={(select) => setSelectSearch(select)}
            />
            <div className="mypage_table">
              <table className="tb02">
                <thead>
                  <tr>
                    <th className="pc_only" style={{ width: "80px" }}>
                      NO
                    </th>
                    <th className="subject" style={{ width: "700px" }}>
                      Title
                    </th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {faqList &&
                    faqList.conferenceFaqs.map((v, i) => {
                      if (search && searchField) {
                        if (v.title && v.title.includes(searchField)) {
                          return faqReturnTable(v, i);
                        } else {
                          return <></>;
                        }
                      } else if (pageFilter(i, faqSelect))
                        return faqReturnTable(v, i);
                    })}
                </tbody>
              </table>
            </div>
            <Pagination
              count={faqList && faqList.conferenceFaqs.length}
              selected={(page) => setFaqSelect(page)}
            />
            <div className="mypage_table mt-5 pt-4">
              <table className="tb02">
                <thead>
                  <tr>
                    <th className="pc_only" style={{ width: "80px" }}>
                      NO
                    </th>
                    <th className="subject" style={{ width: "700px" }}>
                      Title
                    </th>
                    <th>Date</th>
                    <th className="pc_only">State</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiryList &&
                    inquiryList.conferenceInquiries.map((v, i) => {
                      console.log(v);
                      if (search && searchField) {
                        if (v.title && v.title.includes(searchField)) {
                          if (selectSearch === "ALL") {
                            return returnTable(v, i);
                          } else if (selectSearch === v.topic)
                            return returnTable(v, i);
                        } else {
                          return <></>;
                        }
                      } else if (
                        pageFilter(i, inquirySelect) &&
                        selectSearch === "ALL"
                      ) {
                        return returnTable(v, i);
                      } else if (
                        pageFilter(i, inquirySelect) &&
                        selectSearch === v.topic
                      ) {
                        return returnTable(v, i);
                      }
                    })}
                </tbody>
              </table>
            </div>
            <Pagination
              count={inquiryList && inquiryList.conferenceInquiries.length}
              selected={(page) => setInquirySelect(page)}
            />
            <div className="bottomBtn">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/mypage/private/qna_w");
                }}
              >
                {t("quickMenu_inQuiry")}
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
  // } else {
  //   return <Redirect to="/Login" />;
  // }
};

export default Qna;
