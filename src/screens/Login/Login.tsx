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
  Pressable,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api';
import { RootState } from '../../store';
import { useSuccesToast } from '../../hooks/SuccessToast';
import { setToken } from '../../store/modules/token/actions';
import { Input } from '../../components/Input';
import { storeUserInfo } from '../../store/modules/users/actions';
import { FormDataProps, ISessionResponse, SignUpNavigation } from './typescript';
import { loginSchema } from './schema';
import { storageToken } from '../../constants/token-key';
import { StateUser } from '../../store/modules/users/typescript';

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<SignUpNavigation>();
  const showToast = useSuccesToast();
  const { user } = useSelector<RootState, StateUser>((state) => state.user);
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormDataProps>({
    resolver: yupResolver(loginSchema),
  });

  const handleNavigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, []);

  const storeUserToken = async (token: string) => {
    await AsyncStorage.setItem(storageToken, token);
  };

  const getToken = async () => await AsyncStorage.getItem(storageToken);

  const handleUserLogin = async ({ email, password }: FormDataProps) => {
    setLoading(true);
    try {
      const res = await api.post<ISessionResponse>('/sessions', { email: user?.email ?? email, password });
      const { token, user: userData } = res.data;
      dispatch(storeUserInfo(userData));
      await storeUserToken(token);
      const tokenFromStorage = await getToken();
      dispatch(setToken(tokenFromStorage));
      showToast({ message: 'Logged in with success' });
    } catch (e) {
      setError('email', { message: 'Wrong password/email combination' })
      setError('password', { message: 'Wrong password/email combination' })
    }
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
                type={showPassword ? 'text' : 'password'}
                InputRightElement={(
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />} size={5} mr={3} />
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
