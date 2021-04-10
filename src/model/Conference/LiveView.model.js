import axios from "axios";

class ConferenceLiveViewModel {
  constructor(conferenceId, conferenceLiveId, authHeader) {
    this.liveInformation = axios
      .get(
        `/api/conferences/${conferenceId}/lives/${conferenceLiveId}`,
        authHeader
      )
      .then(async (res) => {
        return Promise.resolve(res.data);
      })
      .catch(async (err) => {
        return Promise.reject(err);
      });
  }
  async getConferenceLive() {
    return this.liveInformation;
  }
}

export default ConferenceLiveViewModel;
