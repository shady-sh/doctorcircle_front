import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCert,
  setVerifyCode,
  setVerifyPhoneNumber,
} from "../store/moduels/action";

// 아이디 찾기 및 비밀번호 찾기에서 사용되는 타이머를 컴포넌트화 하여 재사용성을 높임

export const Timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const dispatch = useDispatch();
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          dispatch(setCert(false));
          dispatch(setVerifyCode(null));
          dispatch(setVerifyPhoneNumber(null));
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      {minutes === 0 && seconds === 0 ? null : (
        <span className="time">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      )}
    </>
  );
};
