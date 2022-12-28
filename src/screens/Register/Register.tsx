import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Center, Box, Heading, VStack, Button, Pressable, Icon, Spinner, useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AxiosError } from 'axios';
import { Input } from '../../components/Input';
import { storeUserInfo } from '../../store/modules/users/actions';
import { useSuccesToast } from '../../hooks/SuccessToast';
import { NavigationsParamList } from '../Login/Login';
import { useAxios } from '../../hooks/useAxios/useAxios';
import { api } from '../../services/api';

export interface IUser {
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

const signUpSchema: yup.SchemaOf<FormDataProps> = yup.object({
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control, handleSubmit, formState: { errors }, setError,
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginNavigation>();
  const showToast = useSuccesToast();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleRedirect = () => {
    navigation.navigate('Login');
  };

  const checkIfUserEmailExists = (email: FormDataProps['email']) => {
    api.post('/user/email', { email }).then(() => {
      setError('email', { message: 'Email already exist' });
    }).catch(() => {});
  };

  const handleSignUp = async (data: FormDataProps) => {
    setLoading(true);
    checkIfUserEmailExists(data.email);
    try {
      const res = await api.post<IUser>('/users', { ...data });
      dispatch(storeUserInfo(res.data));
      showToast({ message: 'Signed up with success' });
      handleRedirect();
    } catch {
      toast.show({
        colorScheme: 'danger',
        title: 'Error while trying to sign up',
      });
    }

    setLoading(false);
  };

  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                label="name"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                label="email"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                label="password"
                onChangeText={onChange}
                type={showPassword ? 'text' : 'password'}
                InputRightElement={(
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />} size={5} mr={3} />
                  </Pressable>
                )}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit(handleSignUp)}>
            {loading ? <Spinner color="cyan.500" size="sm" /> : 'Sign Up'}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
