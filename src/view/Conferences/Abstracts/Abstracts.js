import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import Pagination, { pageFilter } from "../../../components/Pagination";
import SearchBox from "../../../components/SearchBox";
import ConferenceAbstractsModel from "../../../model/Conference/Abstracts.model";
import ErrorPage from "../../ErrorPage";

export const ConferenceAbstracts = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abstractList, setAbstractList] = useState(null);

  const [selected, setSelected] = useState(1);
  const [selectSearch, setSelectSearch] = useState("all");
  const [searchField, setSearchField] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fetchAbstractList = async () => {
      try {
        setLoading(true);
        setError(null);
        setAbstractList(null);
        const conferenceAbstractsModel = new ConferenceAbstractsModel(1);
        await conferenceAbstractsModel
          .getConferenceAbstractList()
          .then((res) => setAbstractList(res.conferenceAbstracts));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchAbstractList();
  }, []);

  const { t } = useTranslation();

  const onChangeSearchfield = (e) => setSearchField(e.target.value);
  const clickToSearch = (e) => {
    if (e) e.preventDefault();
    setSearch(true);
  };

  const returnTable = (v, key) => {
    return (
      <tr
        key={key}
        onClick={() => history.push(`/abstractsview/${v.conferenceAbstractId}`)}
      >
        <td>{v.code}</td>
        <td className="pc_only">
          <b>{v.name}</b>
          {v.hospital}
        </td>
        <td>
          <div className="m_only">
            <b>{v.name}</b>
            {v.hospital}
          </div>
          <span>{v.title}</span>
        </td>
      </tr>
    );
  };

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
    <Header
      element={
        <div className="subArea">
          <Banner title="Abstracts" />
          <div className="subMain board">
            <div className="center">
              <SearchBox
                value={searchField}
                onChange={onChangeSearchfield}
                onClick={clickToSearch}
                onEnter={clickToSearch}
                options={["All", "Oral", "Case", "Post"]}
                select={(select) => setSelectSearch(select.toLowerCase())}
              />
              <div className="board_table">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "178px" }}>NO.</th>
                      <th className="pc_only" style={{ width: "318px" }}>
                        Speaker
                      </th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abstractList &&
                      abstractList.map((v, i) => {
                        if (search && searchField) {
                          if (v.title.includes(searchField)) {
                            if (selectSearch === "all") {
                              return returnTable(v, i);
                            } else if (
                              selectSearch === v.abstractType.toLowerCase()
                            ) {
                              return returnTable(v, i);
                            }
                          } else {
                            return <></>;
                          }
                        } else if (
                          pageFilter(i, selected) &&
                          selectSearch === "all"
                        ) {
                          return returnTable(v, i);
                        } else if (
                          selectSearch === v.abstractType.toLowerCase()
                        ) {
                          return returnTable(v, i);
                        }
                      })}
                  </tbody>
                </table>
              </div>
              <Pagination
                count={abstractList && abstractList.length}
                selected={(selectPage) => setSelected(selectPage)}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};
