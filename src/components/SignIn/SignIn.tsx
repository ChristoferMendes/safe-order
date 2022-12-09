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
  useToast,
} from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';

interface NavigationsParamList {
  SignUp: undefined
  Home: undefined
}

interface ISessionResponse {
  message: string
  token: string
}

type SignUpNavigation = NavigationProp<NavigationsParamList, 'SignUp'>;
type HomeScreenNavigation = NavigationProp<NavigationsParamList, 'Home'>

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const navigation = useNavigation<SignUpNavigation | HomeScreenNavigation>();
  const toast = useToast();

  const handleNavigateToSignIn = () => {
    navigation.navigate('SignUp');
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const showToast = () => {
    toast.show({
      render: () => (
        <Box bg="green.400" px="7" py="4" rounded="xl" mb={5}>
          <Text color="white">
            Logged with success
          </Text>
        </Box>
      ),
    });
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
            <Input onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
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
              <Text onPress={handleNavigateToSignIn}>Sign Up</Text>
            </View>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
