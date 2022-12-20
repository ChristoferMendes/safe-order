import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SignUp } from '../screens/SignUp';
import Login from '../screens/Login';
import { Home } from '../screens/Home';
import { TestForm } from '../components/TestForm';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const [hasAuthToken, setHasAuthToken] = useState('');

  const getTokenFromAsyncStorage = async () => {
    const token = await AsyncStorage.getItem('@storage_token');
    if (!token) return '';

    return setHasAuthToken(token);
  };

  useEffect(() => {
    getTokenFromAsyncStorage();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasAuthToken ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={TestForm} />
        </>
      )}
    </Stack.Navigator>
  );
}
