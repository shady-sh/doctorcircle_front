import { useTranslation } from "react-i18next";
import { getFileName } from "../Formatter/FileName";
import { Mobile } from "../MediaQuery";
import { download } from "./Download";

const Post = (props) => {
  const { subject, name, date, views, desc, files } = props;
  const { t } = useTranslation();

  const clickToMoveList = (e) => {
    e.preventDefault();
    if (props.clickToNextAction) {
      props.clickToNextAction();
    }
  };

  return (
    <div className="subMain board mypage">
      <div className="center">
        <div className="board_view">
          <div className="board_top">
            <div className="subject">{subject}</div>
            <div className="name">{name}</div>
            <div className="date">{date}</div>
            {views && (
              <div className="rightBox">
                <span>조회 수 : {views}</span>
              </div>
            )}
          </div>
          <div className="board_contents" style={{ whiteSpace: "pre-line" }}>
            {desc}
          </div>
          {files.length > 0 && (
            <div className="board_bottom">
              <span className="file_title">첨부파일</span>
              {files.map((v, i) => {
                return (
                  <span key={i}>
                    <span className="file_name" key={i}>
                      {getFileName(v)}
                    </span>
                    <a
                      href={v}
                      target="_new"
                      className="download"
                      onClick={(e) => {
                        e.preventDefault();
                        download(v, getFileName(v));
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
          <a href="" onClick={clickToMoveList}>
            {t("list")}
          </a>
        </div>
      </div>
    </div>
  );
};

export const QnaPost = (props) => {
  const {
    subject,
    name,
    date,
    adminDate,
    userDesc,
    adminDesc,
    isComplete,
    files,
  } = props;
  const { t } = useTranslation();
  const isMobile = Mobile();

  const clickToMoveList = (e) => {
    e.preventDefault();
    if (props.clickToNextAction) {
      props.clickToNextAction();
    }
  };

  const answerStyle = {
    color: "#319fdc",
    fontSize: isMobile ? "12px" : "16px",
    fontWeight: "bold",
  };

  const boardAnswers = {
    padding: isMobile ? "20px 10px 20px 10px" : "30px",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #dadada",
  };

  const nStyle = { marginBottom: "-15px" };

  const admin = {
    marginBottom: isMobile ? "20px" : "30px",
    fontWeight: "bold",
  };

  return (
    <div className="subMain board mypage">
      <div className="center">
        <div className="board_view">
          <div className="board_top">
            {isMobile ? (
              <div className="mb-1" style={answerStyle}>
                {isComplete ? (
                  "[답변완료]"
                ) : (
                  <font color="#8C8C8C">[답변대기]</font>
                )}
              </div>
            ) : null}
            <div className="subject">{subject && subject}</div>
            <div className="name" style={nStyle}>
              {name && name}
            </div>
            <div className="date">{date && date}</div>
            <div className="rightBox">
              {/* 답변 대기 className은 not-answer */}
              <span className="answered mb-5 pb-4" style={answerStyle}>
                {isComplete ? (
                  "답변완료"
                ) : (
                  <font color="#8C8C8C">답변대기</font>
                )}
              </span>
            </div>
          </div>
          <div className="board_contents border-bottom">
            <p style={{ whiteSpace: "pre" }}>{userDesc && userDesc}</p>
          </div>
          {isComplete && (
            <div style={boardAnswers}>
              <div style={admin}>
                <span>[관리자]</span>
                <span
                  className="float-right"
                  style={{
                    fontWeight: "normal",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  {adminDate && adminDate}
                </span>
              </div>
              <p
                style={{
                  fontSize: isMobile ? "14px" : null,
                  whiteSpace: "pre",
                }}
              >
                {adminDesc && adminDesc}
              </p>
            </div>
          )}
          {files && (
            <div className="board_bottom">
              <span className="file_title">첨부파일</span>
              <span>
                <span className="file_name">{getFileName(files)}</span>
                <a
                  href={files}
                  className="download"
                  onClick={(e) => {
                    e.preventDefault();
                    download(files, getFileName(files));
                  }}
                >
                  다운로드
                </a>
              </span>
            </div>
          )}
        </div>
        <div className="bottomBtn">
          <a href="" onClick={clickToMoveList}>
            {t("list")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
