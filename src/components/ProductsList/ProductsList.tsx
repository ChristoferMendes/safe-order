import { View, FlatList, ScrollView, Text, Icon, VStack } from 'native-base';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { IProduct, StateProduct } from '../../store/modules/products/typescript';
import { ProductBox } from '../ProductBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectProductFilter } from '../../store/modules/productFilter/productFilterSlice';
import { MaterialIcons } from '@expo/vector-icons';


const { width } = Dimensions.get('screen')
export function ProductsList() {
  const { products } = useSelector<RootState, StateProduct>(state => state.product)
  const { filter } = useSelector(selectProductFilter)

  const renderItem = ({ item: product }: { item: IProduct }) => (
    <View mb={10}>
      <ProductBox product={product} />
    </View>
  );

  const productsFiltered = products?.filter(product => {
    if (filter === null) return product;

    return product.category?.match(filter)
  })

  return (
    <View mt="12">
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          {productsFiltered?.length ? <FlatList
            data={productsFiltered}
            renderItem={renderItem}
            height={600}
            nestedScrollEnabled
          /> : (
            <VStack w={width} alignItems="center" space="8">
              <Text
                textAlign={"center"}
                color="gray.500"
              >
                Unfortunately we don't have products available for this category.
              </Text>
              <Text fontWeight={"semibold"} fontSize="20" textAlign={'center'}>Please, explore our vast other categories!</Text>
              <Icon as={MaterialIcons} name="sentiment-very-satisfied" size={"12"} color="green.500"/>
            </VStack>
          )}
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}
