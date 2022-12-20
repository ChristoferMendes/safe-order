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
} from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { api } from '../../services/api';
import { RootState } from '../../store';
import { IUser } from '../../screens/Register/Register';
import { useSuccesToast } from '../../components/SuccessToast';

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
  const user = useSelector<RootState, IUser | null>((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const navigation = useNavigation<SignUpNavigation | HomeScreenNavigation>();
  const showToast = useSuccesToast({ message: 'Logged in with success' });

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const storeUserToken = async (token: string) => {
    const tokenStorageKey = '@storage_token';
    await AsyncStorage.setItem(tokenStorageKey, token);
  };

  const handleUserSignIn = async () => {
    const res = await api.post<ISessionResponse>('/sessions', { email, password });
    const { token } = res.data;
    await storeUserToken(token);
    handleNavigateToHome();
    showToast();
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
            <Input onChangeText={setEmail} value={user?.email} />
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
            Sign in
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
              <Text onPress={handleNavigateToRegister}>Sign Up</Text>
            </View>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
