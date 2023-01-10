import { MotiImage } from 'moti'
import { Box, FlatList, HStack, Image, ScrollView, Text, VStack } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../store/modules/products/productSlice';
import { ProductBox } from '../ProductBox';

export function CartWithoutProducts() {
  const { products } = useSelector(selectProduct)

  return (
    <VStack>
      <MotiImage
        source={{ uri: 'https://homempizza.com.br/wp-content/uploads/2019/08/pizza.png' }}
        style={{ height: 200 }}
        resizeMode="contain"
        from={{
          rotate: '180deg',
          opacity: 0,
        }}
        animate={{
          rotate: '0deg',
          opacity: 1
        }}
        transition={{
          type: 'timing',
          duration: 2000
        }}
      />
      <HStack justifyContent="center">
        <Text fontSize={"md"} fontWeight="semibold" my="6">
          Don't have any products? Keep exploring!
        </Text>
      </HStack>
      <ScrollView horizontal>
        <FlatList data={products} renderItem={({ item: product }) => (
          <TouchableWithoutFeedback style={{ marginVertical: 20 }}>
            <ProductBox product={product} />
          </TouchableWithoutFeedback>
        )} />
      </ScrollView>
    </VStack>
  );
}
