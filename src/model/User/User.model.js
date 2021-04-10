import axios from "axios";

class User {
  constructor(authHeader) {
    this.selfUserInformation = axios
      .get(`/api/user`, authHeader)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    this.liveHistories = axios
      .get(`/api/user/live-histories`, authHeader)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    this.vodHistores = axios
      .get("/api/user/vod-histories", authHeader)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    this.eTestHistories = axios
      .get("/api/user/etest-histories", authHeader)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  getSelfUser() {
    return this.selfUserInformation;
  }
  getHistories() {
    return this.liveHistories;
  }
  getVodHistories() {
    return this.vodHistores;
  }
  getETestHistories() {
    return this.eTestHistories;
  }
}

export default User;
