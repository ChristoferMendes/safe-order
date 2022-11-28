import axios from 'axios';

export const api = axios.create({ baseURL: 'https://224c-201-40-65-124.sa.ngrok.io/' });

api.interceptors.response.use((response) => response, (error) => {
  console.warn(error);
  throw error;
});
