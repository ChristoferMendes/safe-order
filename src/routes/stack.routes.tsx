/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Register } from '../screens/Register';
import Login from '../screens/Login';
import { Home } from '../screens/Home';
import { RootState } from '../store';
import { CustomDrawer } from '../components/CustomDrawer';
import { Settings } from '../screens/Settings';
import { ShoppingCart } from '../screens/ShoppingCart';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function StackNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useSelector<RootState, string | null>((state) => state.token);

  const getTokenFromAsyncStorage = async () => {
    const token = await AsyncStorage.getItem('@storage_token');
    if (!token) return setIsAuthenticated(false);

    return setIsAuthenticated(true);
  };

  useEffect(() => {
    getTokenFromAsyncStorage();
  }, [token]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isAuthenticated ? (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="ShoppingCart" component={ShoppingCart} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </>
  );
}
