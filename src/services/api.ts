/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import { Toast } from 'native-base';
import { URI } from 'react-native-dotenv';
import Constants from 'expo-constants';

interface IAxiosErrorResponse {
  status: number;
  data: {
    message: string,
    status: string
    validation: {
      body: {
        source: string;
        keys: string[];
        message: string
      }
    }
  }
}

export const api = axios.create({ baseURL: URI });

// api.interceptors.response.use((response) => response, (error) => {
//   error
//   // const err = error as AxiosError;
//   // const { status, data } = err.response! as IAxiosErrorResponse;
//   // const customMessage = status === 400 ? data.validation.body.message : data.message;

//   // Toast.show({
//   //   title: customMessage,
//   //   backgroundColor: 'red.400',
//   // });
// });
