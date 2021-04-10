export function getFileName(url) {
  if (url === null || url === undefined) return;
  const sOriginImgUrl = url;
  const arSplitUrl = sOriginImgUrl.split("/"); //   "/" 로 전체 url 을 나눈다
  const nArLength = arSplitUrl.length;
  const arFileName = arSplitUrl[nArLength - 1]; // 나누어진 배열의 맨 끝이 파일명이다
  return arFileName;
}
