import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, ScrollView,
} from 'native-base';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Filters } from '../../components/Filters';
import { Header } from '../../components/Header';
import { ImageScroller } from '../../components/ImageScroller';
import { ProductsList } from '../../components/ProductsList';
import { storageToken } from '../../constants/token-key';
import { api } from '../../services/api';
import { storeProductInfo } from '../../store/modules/products/actions';
import { IProduct } from '../../store/modules/products/typescript';
import { storeUserInfo } from '../../store/modules/users/actions';
import { IUser } from '../Register/typescript';

export function Home() {
  const dispatch = useDispatch();

  const dispatchUserInfo = (user: IUser) => {
    dispatch(storeUserInfo(user));
  };

  useEffect(() => {
    async function getProducts() {
      const token = await AsyncStorage.getItem(storageToken)
      const res = await api.get<IProduct[]>('/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(storeProductInfo(res.data))
    }

    getProducts();
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

const makeMeRequest = async () => {
  const token = await AsyncStorage.getItem('@storage_token');
  const res = await api.post<IUser>('/me', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
