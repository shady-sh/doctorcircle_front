import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dateformat from "dateformat";
import MyPage from "../../components/MyPage";
import ConferenceNoticeModel from "../../model/Conference/Notice.model";
import Pagination, { pageFilter } from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import Loading from "../../components/Loading";
import ErrorPage from "../ErrorPage";

const Notify = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noticeList, setNoticeList] = useState();
  const [selected, setSelected] = useState(1);
  const [searchField, setSearchField] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        setError(null);
        setNoticeList(null);
        const conferenceNoticeModel = new ConferenceNoticeModel(1);
        await conferenceNoticeModel.getNoticeList().then((res) => {
          const newArr = [];
          res.conferenceNotices.map((v) => {
            if (v.isPublic) {
              newArr.push(v);
              console.log(v);
            }
          });
          newArr[newArr.length - newArr.length].new = true;
          setNoticeList(newArr);
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchNotice();
  }, []);

  const onChangeSearchfield = (e) => setSearchField(e.target.value);
  const clickToSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    setSearch(true);
  };

  const returnTable = (v, i) => {
    return (
      <tr key={i}>
        <td className="pc_only">{v.conferenceNoticeId}</td>
        <td>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              history.push(`notify_view/${v.conferenceNoticeId}`);
            }}
          >
            {v.title}
            {v.new && (
              <img src="/img/icon_new.svg" className="new" width="15px" />
            )}
          </a>
        </td>
        <td>{dateformat(v.create, "yyyy. mm. dd")}</td>
      </tr>
    );
  };

  if (loading)
    return (
      <MyPage
        title="Notice"
        element={
          <div className="subMain board mypage">
            <div className="center">
              <SearchBox
                value={searchField}
                onChange={onChangeSearchfield}
                onClick={clickToSearch}
              />
              <div className="mypage_table">
                <Loading />
              </div>
            </div>
          </div>
        }
      />
    );

  if (error) return <ErrorPage />;

  return (
    <MyPage
      title="Notice"
      element={
        <div className="subMain board mypage">
          <div className="center">
            <SearchBox
              value={searchField}
              onChange={onChangeSearchfield}
              onClick={clickToSearch}
              onEnter={clickToSearch}
            />
            <div className="mypage_table">
              <table className="tb02">
                <thead>
                  <th className="pc_only" style={{ width: "80px" }}>
                    NO
                  </th>
                  <th className="subject" style={{ width: "900px" }}>
                    Title
                  </th>
                  <th>Date</th>
                </thead>
                <tbody>
                  {noticeList &&
                    noticeList.map((v, i) => {
                      if (search && searchField) {
                        if (v.title.includes(searchField)) {
                          return returnTable(v, i);
                        } else {
                          return <></>;
                        }
                      } else if (pageFilter(i, selected)) {
                        return returnTable(v, i);
                      }
                    })}
                </tbody>
              </table>
            </div>
            <Pagination
              count={noticeList && noticeList.length}
              selected={(selectPage) => setSelected(selectPage)}
            />
          </div>
        </div>
      }
    />
  );
};
export default Notify;
