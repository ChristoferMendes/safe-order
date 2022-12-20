import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Center, Box, Heading, VStack, FormControl, Input, Button,
} from 'native-base';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationsParamList } from '../../components/SignIn/SignIn';
import { api } from '../../services/api';
import { storeUserInfo } from '../../store/modules/users/actions';

export interface IUser {
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  avatar_url: string | null
}

type LoginNavigation = NavigationProp<NavigationsParamList, 'Login'>;

export default function SignUp() {
  const formFields = {
    name: 'name',
    email: 'email',
    password: 'password',
  };
  const initialValues = {
    name: '', email: '', password: '',
  };
  const [formData, setFormData] = useState(initialValues);
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginNavigation>();

  const handleChangeFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRedirect = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    const res = await api.post<IUser>('/users', formData);
    if (!res) return;
    dispatch(storeUserInfo(res.data));

    handleRedirect();
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
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input onChangeText={(text) => handleChangeFormData(formFields.name, text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={(text) => handleChangeFormData(formFields.email, text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(text) => handleChangeFormData(formFields.password, text)}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
