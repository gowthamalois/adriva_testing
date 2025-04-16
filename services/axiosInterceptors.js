import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// **Attach token from ENV to each request**
apiClient.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_TOKEN; // Get token from ENV
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// **Handle API errors**
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request: Token might be invalid or expired.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
