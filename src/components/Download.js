import axios from "axios";

export function download(url, name) {
  if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
  }
  let replacedUrl;
  if (url.includes("http://doctorvill.s3.amazonaws.com")) {
    replacedUrl = url.replace(
      "http://doctorvill.s3.amazonaws.com",
      "/downloadfile"
    );
  }
  axios({
    url: replacedUrl,
    method: "GET",
    responseType: "blob",
  }).then((res) => {
    const blobURL = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = blobURL;
    a.style = "display: none";

    if (name && name.length) a.download = name;
    document.body.appendChild(a);
    a.click();
  });
}
