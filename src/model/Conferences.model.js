import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

const http = axios.create({
  Accept: "application/json",
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

class ConferenceModel {
  constructor(conferenceId, authHeader) {
    this.conferenceInformation = http
      .get(`/api/conferences/${conferenceId}`, authHeader)
      .then(async (response) => {
        return Promise.resolve(response.data);
      })
      .catch(async (err) => {
        return Promise.reject(err);
      });
  }

  async getConferenceInformation() {
    return this.conferenceInformation;
  }
}

export default ConferenceModel;
