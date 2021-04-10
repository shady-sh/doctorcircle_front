import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "@material-ui/core";
import dateFormat from "dateformat";
import Banner from "../../components/Banner";
import Datepicker from "../../components/Datepicker";
import Header from "../../components/Header";
import {
  addMinutes,
  compareDate,
  hoursToMinutes,
} from "../../Formatter/DateFormatter";
import ConferenceScheduleModel from "../../model/Conference/Schedules.model";
import ErrorPage from "../ErrorPage";
import { ProgramPopup } from "../../components/Popup";
import { fnExcelDownload } from "../../Formatter/ExcelDownloader";
import ReactExport from "react-data-export";
import Loading from "../../components/Loading";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ConferenceSchedules = () => {
  const [selectDate, setSelectDate] = useState("");
  const popupRef = useRef([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const [mobileSelectRoom, setMobileSelectRoom] = useState("ROOM 1");

  const handleCopyRoom = (e, id) => {
    e.preventDefault();
    popupRef.current[id].toggleMenu();
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);
        const conferneceScheduleModel = new ConferenceScheduleModel(1);
        await conferneceScheduleModel.getScheduleList().then((res) => {
          setSchedules(res.conferenceSchedules);
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (schedules) {
        try {
          setLoading(true);
          setError(null);
          let count = 0;
          const getSchedules = schedules;
          for (let i = 0; i < getSchedules.length; i++) {
            if (
              compareDate(
                getSchedules[i].totalStartAt,
                getSchedules[i].totalEndAt,
                selectDate
              )
            ) {
              const getRooms = await axios.get(
                `/api/conferences/1/schedules/${getSchedules[i].conferenceScheduleId}/rooms`,
                { params: { date: selectDate } }
              );
              setSelectedRooms(getRooms.data.conferenceScheduleRooms);
              count++;
              break;
            }
          }
          if (count < 1) {
            setSelectedRooms(null);
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      }
    };
    fetchRooms();
  }, [schedules, selectDate]);

  useEffect(() => {
    if (selectedRooms) {
      console.log(selectedRooms);
      const pushedRoom = [
        {
          columns: [
            { title: "Room", width: { wpx: 110 } },
            { title: "Session", width: { wch: 60 } },
            { title: "Time", width: { wch: 30 } },
            { title: "Company", width: { wch: 30 } },
            { title: "Break Time", width: { wch: 15 } },
          ],
          data: [],
        },
      ];
      selectedRooms.map((v) => {
        v.conferenceScheduleSessions &&
          v.conferenceScheduleSessions.map((val) => {
            pushedRoom[0].data.push([
              { value: v.name, style: { font: { sz: "14", bold: true } } },
              { value: val.title, style: { font: { underline: true } } },
              {
                value: `${dateFormat(val.startAt, "HH:MM")} - ${dateFormat(
                  val.endAt,
                  "HH:MM"
                )}`,
              },
              { value: val.company.name },
              { value: val.isBreak && "Break Time" },
              // roomName: v.name,
              // when: `${dateFormat(val.startAt, "HH:MM")} - ${dateFormat(
              //   val.endAt,
              //   "HH:MM"
              // )}`,
              // logo: val.company.logo,
              // breakTime: val.isBreak && "Break Time",
            ]);
          });
      });
      setExcelData(pushedRoom);
    }
  }, [selectedRooms]);

  const downloadExcel = () => {
    return (
      <ExcelFile
        element={
          <div className="btnBox">
            <Button className="download">
              <span>다운로드</span>
              <img src="/img/icon_download.png" />
            </Button>
          </div>
        }
        filename="프로그램 스케줄"
      >
        <ExcelSheet dataSet={excelData} name="Organazation" />
        {/* <ExcelSheet data={excelData && excelData} name="스케쥴 목록">
          <ExcelColumn label="Room" value="roomName" />
          <ExcelColumn label="Time" value="when" />
          <ExcelColumn label="logo" value="logo" />
          <ExcelColumn label="breakTime" value="breakTime" />
        </ExcelSheet> */}
      </ExcelFile>
    );
  };

  const currentDate = (selected) => setSelectDate(selected);

  if (loading)
    return (
      <Header
        element={
          <div className="subArea">
            <Banner title="Program" />
            <div className="subMain program">
              <div className="center">
                <div className="dateBox">
                  <Datepicker currentDate={currentDate} />
                  <div className="btnBox">
                    <a
                      href=""
                      className="download"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <span>다운로드</span>
                      <img src="/img/icon_download.png" />
                    </a>
                  </div>
                </div>
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
            <Banner title="Program" />
            <div className="subMain program">
              <div className="center">
                <div className="dateBox">
                  <Datepicker currentDate={currentDate} />
                  {downloadExcel()}
                </div>
                {selectedRooms && (
                  <div className="schedule pc_only">
                    <div
                      className="scrollBox"
                      style={{
                        width: `${
                          selectedRooms && selectedRooms.length * 300
                        }px`,
                      }}
                    >
                      <table
                        className="table"
                        style={{ tableLayout: "fixed" }}
                        id="resultTable"
                      >
                        <thead>
                          <tr>
                            {/* <th>Time</th> */}
                            {selectedRooms.map((v, i) => {
                              return <th key={i}>{v.name}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {/* <td>??</td> */}
                            {selectedRooms &&
                              selectedRooms.map((v, i) => {
                                if (v.conferenceScheduleSessions.length > 0) {
                                  return (
                                    <td className="border" key={i}>
                                      {v.conferenceScheduleSessions.map(
                                        (val, idx) => {
                                          const startAtToMinutes = hoursToMinutes(
                                            dateFormat(val.startAt, "HH:MM")
                                          );
                                          const endAtToMinutes = hoursToMinutes(
                                            dateFormat(val.endAt, "HH:MM")
                                          );
                                          const totalMinutes =
                                            endAtToMinutes - startAtToMinutes;
                                          return (
                                            <>
                                              <tr key={idx}>
                                                <td
                                                  className="border-top-0 border-bottom"
                                                  style={{
                                                    width: "1000px",
                                                    height: `${
                                                      totalMinutes * 2
                                                    }px`,
                                                    padding: "0 10px",
                                                  }}
                                                >
                                                  <p className="mt-4 pt-2">
                                                    {dateFormat(
                                                      val.startAt,
                                                      "HH:MM"
                                                    )}{" "}
                                                    ~{" "}
                                                    {dateFormat(
                                                      val.endAt,
                                                      "HH:MM"
                                                    )}
                                                  </p>
                                                  <a
                                                    className="mt-2 pt-1"
                                                    href=""
                                                    onClick={(e) =>
                                                      handleCopyRoom(
                                                        e,
                                                        val.conferenceScheduleSessionId
                                                      )
                                                    }
                                                  >
                                                    {val.title}
                                                  </a>
                                                  {val.company && (
                                                    <a
                                                      href=""
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCopyRoom(
                                                          e,
                                                          val.conferenceScheduleSessionId
                                                        );
                                                      }}
                                                    >
                                                      <img
                                                        className="mb-2 pb-1 border"
                                                        style={{
                                                          height: "40px",
                                                        }}
                                                        src={val.company.logo}
                                                      />
                                                    </a>
                                                  )}
                                                </td>
                                              </tr>
                                              {val.isBreak && (
                                                <tr className="break">
                                                  <td
                                                    colSpan={9}
                                                    style={{
                                                      width: "1000px",
                                                    }}
                                                  >
                                                    <div className="mt-3 mb-2">
                                                      Break Time
                                                    </div>
                                                    <div className="mb-3">
                                                      (
                                                      {dateFormat(
                                                        val.endAt,
                                                        "HH:MM"
                                                      )}{" "}
                                                      -{" "}
                                                      {dateFormat(
                                                        addMinutes(
                                                          val.endAt,
                                                          val.breakTime
                                                        ),
                                                        "HH:MM"
                                                      )}
                                                      )
                                                    </div>
                                                  </td>
                                                </tr>
                                              )}
                                            </>
                                          );
                                        }
                                      )}
                                    </td>
                                  );
                                }
                              })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {selectedRooms && (
                  <div className="schedule m_only">
                    <div className="selectBox">
                      <select
                        onChange={(e) => setMobileSelectRoom(e.target.value)}
                      >
                        {selectedRooms.map((v, i) => {
                          return <option key={i}>{v.name}</option>;
                        })}
                      </select>
                    </div>
                    <ul className="timetable">
                      {selectedRooms &&
                        selectedRooms.map((v) => {
                          if (
                            v.conferenceScheduleSessions.length > 0 &&
                            v.name === mobileSelectRoom
                          )
                            return v.conferenceScheduleSessions.map(
                              (val, idx) => {
                                return (
                                  <div key={idx}>
                                    <li>
                                      <div className="time">
                                        {dateFormat(val.startAt, "HH:MM")} ~{" "}
                                        {dateFormat(val.endAt, "HH:MM")}
                                      </div>
                                      <a
                                        href=""
                                        className="text"
                                        onClick={(e) =>
                                          handleCopyRoom(
                                            e,
                                            val.conferenceScheduleSessionId
                                          )
                                        }
                                      >
                                        {val.title}
                                      </a>
                                      <a
                                        href=""
                                        onClick={(e) =>
                                          handleCopyRoom(
                                            e,
                                            val.conferenceScheduleSessionId
                                          )
                                        }
                                      >
                                        <img
                                          className="border"
                                          style={{ height: "40px" }}
                                          src={val.company.logo}
                                        />
                                      </a>
                                    </li>
                                    {val.isBreak && (
                                      <li className="break">
                                        <div className="time">
                                          {dateFormat(val.endAt, "HH:MM")} -{" "}
                                          {dateFormat(
                                            addMinutes(
                                              val.endAt,
                                              val.breakTime
                                            ),
                                            "HH:MM"
                                          )}
                                        </div>
                                        <div className="text">Break Time</div>
                                      </li>
                                    )}
                                  </div>
                                );
                              }
                            );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      />
      {selectedRooms &&
        selectedRooms.map((v) => {
          if (v.conferenceScheduleSessions.length > 0) {
            return v.conferenceScheduleSessions.map((val, idx) => {
              return (
                <ProgramPopup
                  key={idx}
                  ref={(el) =>
                    (popupRef.current[val.conferenceScheduleSessionId] = el)
                  }
                  conferenceId={1}
                  conferenceScheduleId={val.conferenceScheduleId}
                  conferenceScheduleSessionId={val.conferenceScheduleSessionId}
                  title={dateFormat(selectDate, "yyyy. mm. dd")}
                  room={v.name}
                  subject={val.title}
                  companyLogo={val.company.logo}
                />
              );
            });
          }
        })}
    </>
  );
};

export default ConferenceSchedules;
