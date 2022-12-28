import { NavigationProp } from '@react-navigation/native';
import { SchemaOf } from 'yup';
import { NavigationsParamList } from '../../Login/typescript';

type LoginNavigation = NavigationProp<NavigationsParamList, 'Login'>;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
}

type SignUpSchema = SchemaOf<FormDataProps>

export {
  IUser, LoginNavigation, FormDataProps, SignUpSchema,
};
