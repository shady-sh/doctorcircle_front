import dateFormat from "dateformat";

export function getFormatDate(date) {
  const dateSplitBy = date.split("-");
  const year = dateSplitBy[0];
  const month = dateSplitBy[1];
  const daySplit = dateSplitBy[2].split("T");
  const day = daySplit[0];
  return year + ". " + month + ". " + day;
  // yyyy. mm. dd 로 변환해줌
}

export function addMinutes(date, minutes) {
  const dateParsing = new Date(date);
  const minutesSplit = minutes.split(":");
  dateParsing.setMinutes(dateParsing.getMinutes() + parseInt(minutesSplit[1]));
  return dateParsing;
}

export function hoursToMinutes(format) {
  const minutesSplit = format.split(":");
  minutesSplit[0] = parseInt(minutesSplit[0]);
  minutesSplit[1] = parseInt(minutesSplit[1]);
  minutesSplit[0] = minutesSplit[0] * 60;
  return minutesSplit[0] + minutesSplit[1];
}

export function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

export function getNow() {
  const date = new Date();
  const formattedDate = dateFormat(date, "yyyy-mm-dd HH:MM:ss");
  return formattedDate;
}
// 오늘 날짜를 yyyy-MM-dd 형태로 리턴해줌

export function twoCompareDate(date, target) {
  if (date.includes(target)) {
    return true;
  } else {
    return false;
  }
}

export function compareDate(startAt, endAt, target) {
  const startAtToDate = new Date(startAt);
  const endAtToDate = new Date(endAt);
  const targetToDate = new Date(target);
  if (targetToDate >= startAtToDate && targetToDate <= endAtToDate) {
    return true;
  } else {
    return false;
  }
}

export function includeDate(startAt, endAt, target) {
  if (startAt.includes(target) && endAt.includes(target)) {
    return true;
  } else {
    return false;
  }
}

export function dateInclude(startAt, target) {
  if (startAt.includes(target)) {
    return true;
  } else {
    return false;
  }
}

export function dateMinus(startDate, target) {
  const startDateToDate = new Date(startDate);
  const now = new Date(target);
  const result = startDateToDate - now;
  return result;
}
