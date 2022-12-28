import * as yup from 'yup';
import { SignUpSchema } from '../typescript';

export const signUpSchema: SignUpSchema = yup.object({
  name: yup.string().required('Please, fill the name field').notOneOf(['email']),
  password: yup
    .string()
    .required('Please, fill the password field')
    .min(6, 'Password must contain at least 6 characters'),
  email: yup
    .string()
    .required('Please, fill the email field')
    .email('Invalid e-mail'),
});
