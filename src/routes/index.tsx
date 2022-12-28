import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TabNavigator } from './tab.routes';
import { StackNavigator } from './stack.routes';

export function Router() {
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
      {isAuthenticated ? <TabNavigator /> : <StackNavigator />}
    </>
  );
}
