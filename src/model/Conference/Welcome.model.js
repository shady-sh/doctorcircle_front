import axios from "axios";

class ConferenceWelcomeModel {
  constructor(conferenceId, conferenceWelcomeId) {
    this.welcomeInformation = axios
      .get(`/api/conferences/${conferenceId}/welcomes/${conferenceWelcomeId}`)
      .then(async (res) => {
        return Promise.resolve(res.data);
      })
      .catch(async (err) => {
        return Promise.reject(err);
      });
  }

  async getWelcomeInformation() {
    return this.welcomeInformation;
  }
}

export default ConferenceWelcomeModel;
