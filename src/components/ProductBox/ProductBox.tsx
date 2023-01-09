import {
  View, Text, HStack, Image, VStack, useDisclose,
} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import { useCurrencyConverted } from '../../hooks/useCurrencyConverter/useCurrencyConverter';
import { IProduct } from '../../store/modules/products/typescript';
import { ActionSheet } from '../ActionSheet';
import { URI } from 'react-native-dotenv';

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
          <Image source={{ uri: product.image_url }} size={120} alt="" rounded="full" />
        </View>
        <VStack justifyContent="center" space={3}>
          <View>
            <Text maxW={160}>Vegetables with some....dsaddasdsadasdsadassaSasASaa</Text>
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
