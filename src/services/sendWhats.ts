import axios from "axios";

const api = axios.create({
  baseURL: "https://cluster-01.apigratis.com/api/v1/whatsapp/sendText",
});

api.interceptors.request.use((config) => {
  if(!config.headers['Authorization'] && !config.headers['SecretKey'] && !config.headers['PublicToken'] && !config.headers['DeviceToken']) {
    config.headers['Authorization'] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BsYXRhZm9ybWEuYXBpYnJhc2lsLmNvbS5ici9hdXRoL2xvZ2luIiwiaWF0IjoxNjc2NDM0ODAzLCJleHAiOjE3MDc5NzA4MDMsIm5iZiI6MTY3NjQzNDgwMywianRpIjoiM0xGSkt3UVVrRkpVODBTdyIsInN1YiI6IjQ1MiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.IGTWpohJfJCr7j7T2x5kzdsFRuV-eTqCrw6dwZDxsko";
    config.headers['SecretKey'] = "e3b0e4b8-7670-47b6-8543-47f869ccc90e";
    config.headers['PublicToken'] = "e101ed3e-f52b-4214-9fd0-a755cbc1f733";
    config.headers['DeviceToken'] = "cc8ae6f5-bb1c-4a24-b10c-a5bcbd159961";
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
