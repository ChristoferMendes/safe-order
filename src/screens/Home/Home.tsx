import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, ScrollView
} from 'native-base';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filters } from '../../components/Filters';
import { Header } from '../../components/Header';
import { HomeSkeleton } from '../../components/HomeSkeleton';
import { HomeTitle } from '../../components/HomeTitle';
import { ImageScroller } from '../../components/ImageScroller';
import { ProductsList } from '../../components/ProductsList';
import { storageToken } from '../../constants/token-key';
import { api } from '../../services/api';
import { storeProductInfo } from '../../store/modules/products/productSlice';
import { IProduct } from '../../store/modules/products/typescript';
import { storeUserInfo } from '../../store/modules/users/actions';
import { IUser } from '../Register/typescript';

export function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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

      dispatch(storeProductInfo(res.data));
      setLoading(false);
    }


    getProducts()


    makeMeRequest()
      .then(dispatchUserInfo);
  }, []);

  return (
    <ScrollView horizontal={false}>
      <Header />
      <View>
        <HomeTitle />
        <HomeSkeleton loading={loading} />
        <ImageScroller />
        <Filters loading={loading} />
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
