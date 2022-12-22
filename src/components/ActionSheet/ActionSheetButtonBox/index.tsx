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
import { storeProductInChart } from '../../../store/modules/chart/actions';
import { IProduct } from '../../ProductsList/types';

type State = { quantity: number };

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

function QuantityButton() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

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

function PriceButton({ label, price, product }:
  { label: string, price: number, product: IProduct }) {
  const { quantity } = useSelector<RootState, State>((state) => state.actionSheetButton);
  const a = useSelector<RootState>((state) => state.chart);
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

  const pricePlusQuantity = price * quantity;
  const result = currencyConverter(pricePlusQuantity);

  const handleAddToCart = () => {
    console.log('entered');
    dispatch(storeProductInChart(product, pricePlusQuantity));
  };

  console.log('STATE:, ', a);

  return (
    <Button rounded="xl" w="40" h="16" bgColor="black">
      <Text onPress={handleAddToCart} color="white" fontWeight="semibold">{`${label}  ${result}`}</Text>
    </Button>
  );
}

export const ActionSheetButtonBox = Object.assign(Main, {
  QuantityButton, PriceButton,
});
