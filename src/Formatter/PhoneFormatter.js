// 휴대폰번호가 01012345678 이라면 010-1234-5678 로 변환해서 리턴해줌
export function phoneFomatter(num, type) {
  let formatNum = "";

  if (num.length == 11) {
    if (type == 0) {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
    } else {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  } else if (num.length == 8) {
    formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else {
    if (num.indexOf("02") == 0) {
      if (type == 0) {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
      } else {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
      }
    } else {
      if (type == 0) {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }
    }
  }
  if (formatNum.includes("101")) {
    formatNum = formatNum.replace("101", "010");
  }
  return formatNum;
}
