import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { useFonts } from 'expo-font';
import {
  View, ScrollView, Text
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
import { selectProduct, storeProductInfo } from '../../store/modules/products/productSlice';
import { IProduct } from '../../store/modules/products/typescript';
import { invalidateToken } from '../../store/modules/token/actions';
import { storeUserInfo } from '../../store/modules/users/actions';
import { IUser } from '../Register/typescript';

export function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useFonts({ 'Sf-pro': require('../../../assets/fonts/SFPRODISPLAYMEDIUM.otf')});
  const dispatchUserInfo = (user: IUser) => {
    dispatch(storeUserInfo(user));
  };
  const { products } = useSelector(selectProduct)

  useEffect(() => {
   async function getProducts() {
      try {
        const token = await AsyncStorage.getItem(storageToken)
        const res = await api.get<IProduct[]>('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
  
        dispatch(storeProductInfo(res.data));
      } catch {
        console.log('error')
        await AsyncStorage.removeItem(storageToken)
        dispatch(invalidateToken())
      }
      setLoading(false);
    }


    if (products) setLoading(false)

    !products && getProducts()

    makeMeRequest()
      .then(dispatchUserInfo)
      .catch(() => dispatch(invalidateToken()));
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
  try {
    const token = await AsyncStorage.getItem('@storage_token');
    const res = await api.post<IUser>('/me', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    await AsyncStorage.removeItem(storageToken)
    throw new AxiosError()
  }

 
};
