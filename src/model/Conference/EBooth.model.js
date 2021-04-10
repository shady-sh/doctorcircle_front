import axios from "axios";

class ConferenceEBoothModel {
  getConferenceEboothList(conferenceId) {
    return axios
      .get(`/api/conferences/${conferenceId}/ebooths`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  getConferenceEboothInfo(conferenceId, conferenceEboothId) {
    return axios
      .get(`/api/conferences/${conferenceId}/ebooths/${conferenceEboothId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}

export default ConferenceEBoothModel;
