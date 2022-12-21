/* eslint-disable no-return-await */
import {
  View,
  Text,
  Button,
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  Icon,
  Spinner,
} from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api';
import { RootState } from '../../store';
import { IUser } from '../Register/Register';
import { useSuccesToast } from '../../components/SuccessToast';
import { setToken } from '../../store/modules/token/actions';
import { Input } from '../../components/Input';

export interface NavigationsParamList {
  Register: undefined
  Home: undefined
  Login: undefined
}

interface ISessionResponse {
  message: string
  token: string
}

type SignUpNavigation = NavigationProp<NavigationsParamList, 'Register'>;
type HomeScreenNavigation = NavigationProp<NavigationsParamList, 'Home'>

interface FormDataProps {
  email: string;
  password: string;
}

const loginSchema: yup.SchemaOf<FormDataProps> = yup.object({
  email: yup.string().required('Email field is required').email('Email invalid'),
  password: yup.string().required('Password field is required'),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigation = useNavigation<SignUpNavigation | HomeScreenNavigation>();
  const showToast = useSuccesToast({ message: 'Logged in with success' });
  const dispatch = useDispatch();
  const user = useSelector<RootState, IUser | null>((state) => state.user);
  const tokenStorageKey = '@storage_token';
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(loginSchema),
  });

  const handleNavigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, []);

  const storeUserToken = async (token: string) => {
    await AsyncStorage.setItem(tokenStorageKey, token);
  };

  const getToken = async () => await AsyncStorage.getItem(tokenStorageKey);

  const handleUserLogin = async ({ email, password }: FormDataProps) => {
    setLoading(true);
    const res = await api.post<ISessionResponse>('/sessions', { email: user?.email ?? email, password });
    const { token } = res.data;
    await storeUserToken(token);
    const tokenFromStorage = await getToken();
    dispatch(setToken(tokenFromStorage));
    showToast();
    setLoading(false);
  };

  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome to Safe Order
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input label="email" onChangeText={onChange} errorMessage={errors.email?.message} />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                label="password"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                type={show ? 'text' : 'password'}
                InputRightElement={(
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size={5} mr={3} />
                  </Pressable>
                )}
              />
            )}
          />
          <Button mt="2" colorScheme="green" onPress={handleSubmit(handleUserLogin)}>
            {loading ? <Spinner color="cyan.500" size="sm" /> : 'Login'}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              I am a new user.
              {' '}
            </Text>
            <View>
              <Text onPress={handleNavigateToRegister}>Register</Text>
            </View>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
