import 'intl';
import 'intl/locale-data/jsonp/en';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Text, HStack, Button, Icon,
} from 'native-base';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { increaseQuantity, setFinalPrice } from '../../../store/modules/actionSheetButton/actions';
import { storeProductInChart, updateProductInChart } from '../../../store/modules/chart/actions';
import { IProduct } from '../../ProductsList/types';
import { IChart } from '../../../store/modules/chart/interfaces';

interface Product {
  uuid: string;
  image: string;
  quantity: number;
}
type ButtonState = { quantity: number };
type ChartState = { products: Product[] }

function Main({ children }: { children: ReactNode }) {
  return (
    <HStack
      w="xs"
      display="flex"
      justifyContent="center"
      space="3"
    >
      {children}
    </HStack>
  );
}

function QuantityButton({ productUuid }: { productUuid: string }) {
  const dispatch = useDispatch();
  const chart = useSelector<RootState, ChartState>((state) => state.chart);
  const findProduct = chart?.products.find((item) => item.uuid.match(productUuid));
  const [quantity, setQuantity] = useState(findProduct?.quantity ?? 1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    dispatch(increaseQuantity(quantity));
  }, [quantity]);

  return (
    <HStack rounded="xl" w="40" h="16" bgColor="gray.100" alignItems="center" justifyContent="space-around">
      <Button onPress={handleSubtract} variant="ghost" _pressed={{ bgColor: 'red.100' }}>
        <Icon as={MaterialIcons} name="remove" size="2xl" color="gray.400" />
      </Button>
      <Text fontSize="xl">{quantity}</Text>
      <Button onPress={handleAdd} variant="ghost" _pressed={{ bgColor: 'success.100' }}>
        <Icon as={MaterialIcons} name="add" size="2xl" color="gray.500" />
      </Button>
    </HStack>
  );
}

function PriceButton({ product }: { product: IProduct }) {
  const { quantity } = useSelector<RootState, ButtonState>((state) => state.actionSheetButton);
  const chart = useSelector<RootState, IChart>((state) => state.chart);
  const dispatch = useDispatch();

  const lang = 'en-US';
  const currency = 'USD';

  const currencyConverter = (value: number) => {
    const currencyToBeFormated = new Intl.NumberFormat(lang, {
      style: 'currency',
      currency,
    });

    return currencyToBeFormated.format(value);
  };

  const pricePlusQuantity = product.price * quantity;
  const result = currencyConverter(pricePlusQuantity);

  const handleAddToCart = () => {
    const productExist = chart?.products.some((item) => item.uuid === product.uuid);
    if (!productExist) {
      return dispatch(storeProductInChart(product, quantity));
    }

    return dispatch(updateProductInChart(product, quantity));
  };

  // useEffect(() => {

  // }, [])

  return (
    <Button rounded="xl" w="40" h="16" bgColor="black">
      <Text onPress={handleAddToCart} color="white" fontWeight="semibold">{`Add to cart ${result}`}</Text>
    </Button>
  );
}

export const ActionSheetButtonBox = Object.assign(Main, {
  QuantityButton, PriceButton,
});
