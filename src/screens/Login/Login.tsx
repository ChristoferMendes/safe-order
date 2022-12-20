/* eslint-disable no-return-await */
import {
  View,
  Text,
  Button,
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
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
import { api } from '../../services/api';
import { RootState } from '../../store';
import { IUser } from '../Register/Register';
import { useSuccesToast } from '../../components/SuccessToast';
import { setToken } from '../../store/modules/token/actions';

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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigation = useNavigation<SignUpNavigation | HomeScreenNavigation>();
  const showToast = useSuccesToast({ message: 'Logged in with success' });
  const dispatch = useDispatch();
  const user = useSelector<RootState, IUser | null>((state) => state.user);
  const tokenStorageKey = '@storage_token';

  const handleNavigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, []);

  const storeUserToken = async (token: string) => {
    await AsyncStorage.setItem(tokenStorageKey, token);
  };

  const getToken = async () => await AsyncStorage.getItem(tokenStorageKey);

  const handleUserSignIn = async () => {
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
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={setEmail} value={user?.email ?? email} placeholder="Email" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={setPassword}
              w={{
                base: '100%',
                md: '25%',
              }}
              type={show ? 'text' : 'password'}
              InputRightElement={(
                <Pressable onPress={() => setShow(!show)}>
                  <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size={5} mr={3} />
                </Pressable>
              )}
              placeholder="Password"
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
              href="http"
            >
              Forget Password?
            </Link>

          </FormControl>
          <Button mt="2" colorScheme="green" onPress={handleUserSignIn}>
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
