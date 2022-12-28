import { NavigationProp } from '@react-navigation/native';
import { SchemaOf } from 'yup';
import { NavigationsParamList } from '../../Login/typescript';

interface IUser {
  uuid: string;
  name: string;
  email: string;
  avatar: string | null;
  avatar_url: string | null;
}

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
