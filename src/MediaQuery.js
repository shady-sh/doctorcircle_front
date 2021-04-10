import React from "react";
import { useMediaQuery } from "react-responsive";

// 유저의 환경이 모바일인지 PC 인지 체크해주는 컴포넌트

export const Mobile = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:600px)",
  });
  if (isMobile) {
    return true;
  } else {
    return false;
  }
};

export const PC = () => {
  const isPc = useMediaQuery({
    query: "(min-width:601px) ",
  });
  if (isPc) {
    return true;
  } else {
    return false;
  }
};
