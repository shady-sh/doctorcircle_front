import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AlertPopup, Popup } from "../../components/Popup";
import { Timer } from "../../components/Timer";
import {
  setCert,
  setMatch,
  setVerifyCode,
  setVerifyPhoneNumber,
} from "../../store/moduels/action";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../components/WindowDimension";

axios.defaults.withCredentials = true;
const headers = { type: "local" };

// 아이디 찾기 페이지 (경로: /FindUserID)
const FindUserID = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [certNumber, setCertNumber] = useState("");
  const [emailData, setEmailData] = useState("");

  const { height } = useWindowDimensions();

  const certNumberPopup = useRef();
  const certMatchPopup = useRef();
  const invalidNumberPopup = useRef();
  const doesntMatchPopup = useRef();

  const dispatch = useDispatch();

  const cert = useSelector((state) => state.cert.cert);
  const matchVerifyCode = useSelector((state) => state.verifyCode.verifyCode);
  const matchNumber = useSelector(
    (state) => state.verifyPhoneNumber.verifyPhoneNumber
  );
  const isMatch = useSelector((state) => state.isMatch.match);

  const { t } = useTranslation();

  const onChangeName = (e) => setName(e.target.value);
  const onChangeNumber = (e) => setPhoneNumber(e.target.value);
  const onChangeCertNumber = (e) => setCertNumber(e.target.value);

  const certToSubmit = (e) => {
    e.preventDefault();
    if (name && phoneNumber.includes("010" || "011")) {
      const params = { type: "local", phoneNumber, name };
      axios
        .post("/api/auth/certRequest", params)
        .then((returnData) => {
          const { number, verifyCode, getCert, userIds } = returnData.data;
          dispatch(setCert(getCert));
          dispatch(setVerifyCode(verifyCode));
          dispatch(setVerifyPhoneNumber(number));
          setEmailData(userIds.email);
          certNumberPopup.current.toggleMenu();
        })
        .catch((err) => {
          alert(err.response.data.error.message);
        });
    } else {
      invalidNumberPopup.current.toggleMenu();
    }
  };

  const certConfirmToSubmit = (e) => {
    e.preventDefault();
    if (cert && matchVerifyCode && matchNumber) {
      if (certNumber == matchVerifyCode) {
        dispatch(setMatch(true));
        certMatchPopup.current.toggleMenu();
      } else {
        doesntMatchPopup.current.toggleMenu();
      }
    }
  };

  const confirmToSubmit = (e) => {
    e.preventDefault();
    if (name && isMatch && emailData) {
      props.history.push({
        pathname: "/FoundID",
        state: { userEmail: emailData },
      });
    }
  };

  return (
    <div
      id="wrapper"
      style={{ marginBottom: height > 1148 && `${height - 1148}px` }}
    >
      <div className="login">
        <div className="center">
          <a href="/" className="logo">
            <img src="/img/logo.png" />
          </a>
          <div className="title">{t("findID_title")}</div>
          <ul className="formBox">
            <div className="form_title mgT0">{t("findID_name")}</div>
            <li>
              <div className="inputBox">
                <input
                  type="text"
                  placeholder={t("findID_nameInput")}
                  value={name}
                  onChange={onChangeName}
                />
              </div>
            </li>
            <div className="form_title">{t("findID_mobile")}</div>
            <li className="inc_btn">
              <div className="inputBox">
                <input
                  type="number"
                  placeholder={t("findID_mobileInput")}
                  value={phoneNumber}
                  onChange={onChangeNumber}
                />
              </div>
              <a href="" onClick={certToSubmit}>
                {t("findID_btnGetVerify")}
              </a>
            </li>
            <div className="form_title">{t("findID_verifyNum")}</div>
            <li className="inc_btn">
              <div className="inputBox">
                <input
                  type="number"
                  placeholder={t("findID_verifyInput")}
                  value={certNumber}
                  onChange={onChangeCertNumber}
                />
                {cert ? <Timer initialMinute={5} /> : <></>}
              </div>
              <a href="" className="btn_style1" onClick={certConfirmToSubmit}>
                {t("findID_btnVerify")}
              </a>
            </li>
            <a href="" className="bottomBtn" onClick={confirmToSubmit}>
              {t("findID_btnConfirm")}
            </a>
          </ul>
        </div>
        {/* 커스텀 알럿 메시지 */}
        <Popup ref={certNumberPopup} desc={t("findID_sent")} />
        <Popup ref={certMatchPopup} desc={t("findID_success")} />
        <AlertPopup
          ref={invalidNumberPopup}
          desc={t("findPW_invalidInf")}
          subDesc={t("findPW_invalidInfSub")}
        />
        <AlertPopup ref={doesntMatchPopup} desc={t("findID_notMatch")} />
      </div>
    </div>
  );
};

export default FindUserID;
