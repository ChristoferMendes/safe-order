import { NavigationProp } from '@react-navigation/native';

interface NavigationsParamList {
  Register: undefined
  Home: undefined
  Login: undefined
}

interface ISessionResponse {
  message: string
  token: string
  user: {
    uuid: string;
    name: string;
    email: string;
    avatar: string | null;
    avatar_url: string | null;
  }
}

type SignUpNavigation = NavigationProp<NavigationsParamList, 'Register'>;

interface FormDataProps {
  email: string;
  password: string;
}

export {
  NavigationsParamList, ISessionResponse, SignUpNavigation, FormDataProps,
};
