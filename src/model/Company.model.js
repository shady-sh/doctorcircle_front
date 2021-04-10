import axios from "axios";

class CompanyModel {
  constructor(companyId) {
    this.companyInformation = axios
      .get(`/api/companies/${companyId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  getCompany() {
    return this.companyInformation;
  }
}

export default CompanyModel;
