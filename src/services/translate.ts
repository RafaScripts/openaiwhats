import axios from "axios";

const apiTranslate = axios.create({
  baseURL: "https://google-translate1.p.rapidapi.com/language/translate/v2"
});

apiTranslate.interceptors.request.use((config) => {
  if(!config.headers['X-RapidAPI-Key'] && !config.headers['X-RapidAPI-Host']) {
    config.headers['X-RapidAPI-Key'] = "0e0c63700emsh5ba4628c0e1e9f9p16284fjsnd25efb3adf2d";
    config.headers['X-RapidAPI-Host'] = "google-translate1.p.rapidapi.com";
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiTranslate;
