import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getToday } from "../Formatter/DateFormatter";

const Datepicker = (props) => {
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getToday());

  const clickToPrevDate = (e) => {
    e.preventDefault();
    const datePick = window.$("#datepicker").datepicker("getDate", "-1d");
    datePick.setDate(datePick.getDate() - 1);
    window.$("#datepicker").datepicker("setDate", datePick);
    const newData = window.$("#datepicker").datepicker("getDate");
    setSelectedDate(
      `${newData.getFullYear()} ${newData.getMonth() + 1} ${newData.getDate()}`
    );
  };

  const clickToNextDate = (e) => {
    e.preventDefault();
    const datePick = window.$("#datepicker").datepicker("getDate", "+1d");
    datePick.setDate(datePick.getDate() + 1);
    window.$("#datepicker").datepicker("setDate", datePick);
    const newData = window.$("#datepicker").datepicker("getDate");
    setSelectedDate(
      `${newData.getFullYear()} ${newData.getMonth() + 1} ${newData.getDate()}`
    );
  };

  useEffect(() => {
    const constructor = () => {
      if (!constructorHasRun) {
        setConstructorHasRun(true);
        window.$(function () {
          window.$.datepicker.setDefaults({
            dateFormat: "yy. mm. dd (DD)", //Input Display Format 변경
            showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
            changeYear: true, //콤보박스에서 년 선택 가능
            changeMonth: true, //콤보박스에서 월 선택 가능
            //,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
            //,buttonImage: "img/icon_calendar.png" //버튼 이미지 경로
            buttonImageOnly: true, //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
            buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
            yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
            monthNamesShort: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ], //달력의 월 부분 텍스트
            monthNames: [
              "1M",
              "2M",
              "3M",
              "4M",
              "5M",
              "6M",
              "7M",
              "8M",
              "9M",
              "10M",
              "11M",
              "12M",
            ], //달력의 월 부분 Tooltip 텍스트
            dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], //달력의 요일 부분 텍스트
            dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], //달력의 요일 부분 Tooltip 텍스트
            minDate: "-1M", //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            maxDate: "+1M", //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
          });

          //input을 datepicker로 선언
          window.$("#datepicker").datepicker({
            onSelect: (dateText) => {
              setSelectedDate(dateText);
            },
          });
          window.$("#datepicker").datepicker("setDate", "today");
        });
      }
    };
    constructor();
    if (props.currentDate) {
      const formattedDate = dateFormat(selectedDate, "yyyy-mm-dd");
      props.currentDate(formattedDate);
    }
  });
  return (
    <div className="dateBox">
      <a href="" className="prevBtn" onClick={clickToPrevDate}>
        <img src="/img/icon_prev_date.png" />
      </a>
      <div className="datepicker">
        <input type="text" id="datepicker" readOnly />
      </div>
      <a href="" className="nextBtn" onClick={clickToNextDate}>
        <img src="/img/icon_next_date.png" />
      </a>
    </div>
  );
};

export default withRouter(Datepicker);
