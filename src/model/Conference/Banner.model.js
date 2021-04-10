import axios from "axios";

class ConferenceBannerModel {
  constructor(conferenceId, conferenceBannerId) {
    this.bannerList = axios
      .get(`/api/conferences/${conferenceId}/banners`)
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    this.bannerInformation =
      conferenceBannerId &&
      axios
        .get(`/api/conferences/${conferenceId}/banners/${conferenceBannerId}`)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .catch(err => {
          return Promise.reject(err);
        });
  }

  getBannerList() {
    return this.bannerList;
  }
  getBannerInformation() {
    return this.bannerInformation;
  }
}

export default ConferenceBannerModel;
