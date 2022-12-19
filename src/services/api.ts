/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import { URI } from 'react-native-dotenv';

export const api = axios.create({ baseURL: URI });

api.interceptors.response.use((response) => response, (error) => {
  const err = error as AxiosError;

  if (err.status === 401) {
    console.log('hey');
  }
});
