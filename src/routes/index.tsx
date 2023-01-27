import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TabNavigator } from './tab.routes';
import { StackNavigator } from './stack.routes';
import { storageToken } from '../constants/token-key';
import { StateToken } from '../store/modules/token/typescript';

export function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token } = useSelector<RootState, StateToken>((state) => state.token);

  const getTokenFromAsyncStorage = async () => {
    const tokenFromAsyncStorage = await AsyncStorage.getItem(storageToken);
    if (!tokenFromAsyncStorage) return setIsAuthenticated(false);

    return setIsAuthenticated(true);
  };

  console.log('tokenState', token)


  useEffect(() => {
    getTokenFromAsyncStorage();
    (async () => {
      
    })()
  }, [token]);

  return isAuthenticated ? <TabNavigator /> : <StackNavigator />;
}
