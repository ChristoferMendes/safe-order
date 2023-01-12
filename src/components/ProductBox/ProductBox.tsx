import {
  View, Text, HStack, VStack, useDisclose,
} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import { useCurrencyConverted } from '../../hooks/useCurrencyConverter/useCurrencyConverter';
import { IProduct } from '../../store/modules/products/typescript';
import { ActionSheet } from '../ActionSheet';
import { ProductImage } from '../ProductImage';

export function ProductBox({ product }: { product: IProduct }) {
  const {
    isOpen, onOpen, onClose,
  } = useDisclose();

  const handleOpenActionSheet = () => {
    if (isOpen) return;
    onOpen();
  };

  const currencyConverter = useCurrencyConverted();
  const priceNumberToCurrency = currencyConverter(product.price);
  

  return (
    <TouchableWithoutFeedback>
      <HStack mx={10} onTouchEnd={handleOpenActionSheet}>
        <View>
          <ProductImage imageLink={product.image_url} rounded="full" alt="" />
        </View>
        <VStack justifyContent="center" space={3}>
          <View>
            <Text maxW={160} ml="2">{product.description}</Text>
          </View>
          <HStack pl={3} justifyContent="space-around">
            <Text fontWeight="semibold">{priceNumberToCurrency}</Text>
            <Text color="gray.300">325 Kcal</Text>
          </HStack>
        </VStack>
        <ActionSheet isOpen={isOpen} product={product} onClose={onClose} />
      </HStack>
    </TouchableWithoutFeedback>
  );
}
