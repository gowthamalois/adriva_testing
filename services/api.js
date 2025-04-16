import apiClient from "./axiosInterceptors";

class apiServices {
  fetchdata(data) {
    return apiClient.post("/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default apiServices;
