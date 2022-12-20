/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import { Toast } from 'native-base';
import { useState } from 'react';
import { URI } from 'react-native-dotenv';

interface iAxiosErrorResponse {
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

api.interceptors.response.use((response) => response, (error) => {
  const err = error as AxiosError;
  const { status, data } = err.response! as iAxiosErrorResponse;
  const customMessage = status === 400 ? data.validation.body.message : data.message;

  Toast.show({
    title: customMessage,
    backgroundColor: 'red.400',
  });
});
