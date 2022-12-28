import * as yup from 'yup';
import { FormDataProps } from '../typescript';

export const loginSchema: yup.SchemaOf<FormDataProps> = yup.object({
  email: yup.string().required('Email field is required').email('Email invalid'),
  password: yup.string().required('Password field is required'),
});
