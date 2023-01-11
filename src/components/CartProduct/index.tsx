import { View, HStack } from 'native-base';
import { ReactNode } from 'react';
import { InfoContainer } from './InfoContainer';
import { Title } from './Title';
import { Price } from './Price';
import { ButtonsQuantity } from './ButtonsQuantity';
import { CartProductProvider } from './store/CartProductContext';
import { IProduct } from '../../store/modules/products/typescript';

function Main({ children, product }: { children: ReactNode, product: IProduct }) {
  return (
    <View>
      <CartProductProvider product={product}>
        <HStack px={5}>{children}</HStack>
      </CartProductProvider>
    </View>
  )
}

export const CartProduct = Object.assign(Main, {
  InfoContainer, Title, ButtonsQuantity, Price
})


