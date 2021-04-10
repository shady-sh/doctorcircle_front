// src/setupProxy.js
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/api", {
      target: "http://dev-api.dvcon.live",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // URL ^/api -> 공백 변경
      },
    })
  );
  app.use(
    proxy("/downloadfile", {
      target: "http://doctorvill.s3.amazonaws.com",
      changeOrigin: true,
      pathRewrite: { "^/downloadfile": "" },
    })
  );
};
