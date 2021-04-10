import axios from "axios";

class ConferenceLiveModel {
  constructor(conferenceId) {
    this.liveList = axios
      .get(`/api/conferences/${conferenceId}/lives`)
      .then(async (res) => {
        return Promise.resolve(res.data);
      })
      .catch(async (err) => {
        return Promise.reject(err);
      });
  }

  async getLiveList() {
    return this.liveList;
  }
}

export default ConferenceLiveModel;
