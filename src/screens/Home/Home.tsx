import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, ScrollView,
} from 'native-base';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Filters } from '../../components/Filters';
import { Header } from '../../components/Header';
import { ImageScroller } from '../../components/ImageScroller';
import { ProductsList } from '../../components/ProductsList';
import { api } from '../../services/api';
import { storeUserInfo } from '../../store/modules/users/actions';
import { IUser } from '../Register/Register';

const makeMeRequest = async () => {
  const token = await AsyncStorage.getItem('@storage_token');
  const res = await api.post<IUser>('/me', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export function Home() {
  const dispatch = useDispatch();

  const dispatchUserInfo = (user: IUser) => {
    dispatch(storeUserInfo(user));
  };

  useEffect(() => {
    makeMeRequest()
      .then(dispatchUserInfo);
  }, []);

  return (
    <ScrollView horizontal={false}>
      <Header />
      <View>
        <View pt={5} pl={8}>
          <Text fontWeight="bold" fontSize="xl">Order the best ones!</Text>
        </View>
        <ImageScroller />
        <Filters />
        <ProductsList />
      </View>
    </ScrollView>
  );
}
