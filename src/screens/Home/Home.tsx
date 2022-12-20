import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { ImageScroller } from '../../components/ImageScroller';
import { TestMenu } from '../../components/TestMenu';
import { Example } from '../../components/TestMenu/TestMenu';
import { invalidateToken } from '../../store/modules/token/actions';

export function Home() {
  return (
    <View>
      <Header />
      <View>
        <Text>Order the best ones!</Text>
      </View>
      <View>
        <ImageScroller />
      </View>
      <View />
    </View>
  );
}
