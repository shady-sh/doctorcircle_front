import { useRef, useState } from "react";
import axios from "axios";
import { AlertPopup, Popup } from "../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import {
  setCert,
  setMatch,
  setVerifyCode,
  setVerifyPhoneNumber,
} from "../../store/moduels/action";
import { Timer } from "../../components/Timer";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../components/WindowDimension";

// 비밀번호 찾기 페이지 (경로: /FindUserPassword)
const FindUserPassword = (props) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [certNumber, setCertNumber] = useState("");

  const { height } = useWindowDimensions();

  const certNumberPopup = useRef();
  const invalidEmailPopup = useRef();
  const certMatchPopup = useRef();
  const doesntMatchPopup = useRef();

  const dispatch = useDispatch();

  const cert = useSelector((state) => state.cert.cert);
  const matchVerifyCode = useSelector((state) => state.verifyCode.verifyCode);
  const matchNumber = useSelector(
    (state) => state.verifyPhoneNumber.verifyPhoneNumber
  );
  const isMatch = useSelector((state) => state.isMatch.match);

  const { t } = useTranslation();

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangeNumber = (e) => setPhoneNumber(e.target.value);
  const onChangeCertNumber = (e) => setCertNumber(e.target.value);

  const certToSubmit = (e) => {
    e.preventDefault();
    if (email) {
      if (phoneNumber.includes("010" || "011")) {
        const params = { type: "local", phoneNumber, email };
        axios
          .post("/api/auth/certRequest", params)
          .then((returnData) => {
            const { number, verifyCode, getCert } = returnData.data;
            dispatch(setCert(getCert));
            dispatch(setVerifyCode(verifyCode));
            dispatch(setVerifyPhoneNumber(number));
            certNumberPopup.current.toggleMenu();
          })
          .catch((err) => {
            alert(err.response.data.error.message);
          });
      } else {
        invalidEmailPopup.current.toggleMenu();
      }
    } else {
      invalidEmailPopup.current.toggleMenu();
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
    if (email && isMatch) {
      props.history.push({
        pathname: "/FoundUserPassword",
        state: { email, mobile: matchNumber },
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
          <div className="title">{t("findPW_title")}</div>
          <ul className="formBox">
            <div className="form_title mgT0">{t("findPW_email")}</div>
            <li>
              <div className="inputBox">
                <input
                  type="text"
                  placeholder={t("findPW_emailInput")}
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
            </li>
            <div className="form_title">{t("findPW_mobile")}</div>
            <li className="inc_btn">
              <div className="inputBox">
                <input
                  type="number"
                  placeholder={t("findPW_mobileInput")}
                  value={phoneNumber}
                  onChange={onChangeNumber}
                />
              </div>
              <a href="" onClick={certToSubmit}>
                {t("findPW_btnGetVerify")}
              </a>
            </li>
            <div className="form_title">{t("findPW_verifyNum")}</div>
            <li className="inc_btn">
              <div className="inputBox">
                <input
                  type="number"
                  placeholder={t("findPW_verifyInput")}
                  value={certNumber}
                  onChange={onChangeCertNumber}
                />
                {cert ? <Timer initialMinute={5} /> : <></>}
              </div>
              <a href="" className="btn_style1" onClick={certConfirmToSubmit}>
                {t("findPW_btnVerify")}
              </a>
            </li>
            <a href="" className="bottomBtn" onClick={confirmToSubmit}>
              {t("findPW_btnConfirm")}
            </a>
          </ul>
        </div>
        <Popup ref={certNumberPopup} desc={t("findPW_sent")} />
        <AlertPopup
          ref={invalidEmailPopup}
          desc={t("findPW_invalidInf")}
          subDesc={t("findPW_invalidInfSub")}
        />
        <Popup ref={certMatchPopup} desc={t("findPW_success")} />
        <AlertPopup ref={doesntMatchPopup} desc={t("findPW_notMatch")} />
      </div>
    </div>
  );
};

export default FindUserPassword;
