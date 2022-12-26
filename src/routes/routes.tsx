/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Register } from '../screens/Register';
import Login from '../screens/Login';
import { Home } from '../screens/Home';
import { RootState } from '../store';
import { ShoppingCart } from '../screens/ShoppingCart';
import { Settings } from '../screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <>
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'blue.500',
            tabBarLabelStyle: {
              backgroundColor: 'red.200',
            },
            tabBarStyle: {
              height: 60,
            },
            tabBarShowLabel: false,
          }}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon size={size} color={color} as={MaterialIcons} name="home" />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={ShoppingCart}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon size={size} color={color} as={MaterialIcons} name="shopping-cart" />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon size={size} color={color} as={MaterialIcons} name="settings" />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </>
  );
}
