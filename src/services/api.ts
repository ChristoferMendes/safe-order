/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import { URI } from 'react-native-dotenv';

export const api = axios.create({ baseURL: URI });
