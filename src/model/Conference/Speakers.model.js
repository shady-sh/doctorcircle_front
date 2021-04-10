import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

const http = axios.create({
  Accept: "application/json",
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

class ConferenceSpeakersModel {
  constructor(conferenceId, conferenceSpeakerId) {
    this.speakersList = http
      .get(`/api/conferences/${conferenceId}/speakers`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(err));
    this.speakerInfo =
      conferenceSpeakerId &&
      http
        .get(`/api/conferences/${conferenceId}/speakers/${conferenceSpeakerId}`)
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
  }

  getSpeakerList() {
    return this.speakersList;
  }
  getSpeakerInfo() {
    return this.speakerInfo;
  }
}

export default ConferenceSpeakersModel;
