import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Register } from '../screens/Register';
import Login from '../screens/Login';
import { Home } from '../screens/Home';
import { RootState } from '../store';
import { Notification } from '../components/Notification';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function StackNavigator() {
  const [hasAuthToken, setHasAuthToken] = useState(false);
  const token = useSelector<RootState, string | null>((state) => state.token);

  const getTokenFromAsyncStorage = async () => {
    const token = await AsyncStorage.getItem('@storage_token');
    if (!token) return setHasAuthToken(false);

    return setHasAuthToken(true);
  };

  useEffect(() => {
    getTokenFromAsyncStorage();
  }, [token]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {hasAuthToken ? (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Notification" component={Notification} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </>
  );
}
