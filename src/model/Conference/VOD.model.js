import axios from "axios";

class ConferenceVODModel {
  constructor(conferenceId, conferenceVodId, authHeader) {
    this.vods = axios
      .get(`/api/conferences/${conferenceId}/vods`)
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    this.vodInformation =
      conferenceVodId &&
      authHeader &&
      axios
        .get(
          `/api/conferences/${conferenceId}/vods/${conferenceVodId}`,
          authHeader
        )
        .then(res => {
          return Promise.resolve(res.data);
        })
        .catch(err => {
          return Promise.reject(err);
        });
  }

  getVodList() {
    return this.vods;
  }
  getVodInformation() {
    return this.vodInformation;
  }
}

export default ConferenceVODModel;
