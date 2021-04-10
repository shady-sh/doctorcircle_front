import axios from "axios";

class ConferenceAbstractsModel {
  constructor(conferenceId, conferenceAbstractId) {
    this.abstractsList = axios
      .get(`/api/conferences/${conferenceId}/abstracts`)
      .then(async (res) => {
        return Promise.resolve(res.data);
      })
      .catch(async (err) => {
        return Promise.reject(err);
      });
    this.abstractInf =
      conferenceAbstractId &&
      axios
        .get(
          `/api/conferences/${conferenceId}/abstracts/${conferenceAbstractId}`
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
  }

  async getConferenceAbstractList() {
    return this.abstractsList;
  }

  async getConferenceAbstract() {
    return this.abstractInf;
  }
}

export default ConferenceAbstractsModel;
