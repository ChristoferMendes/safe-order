import 'intl';
import 'intl/locale-data/jsonp/en';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Text, HStack, Button, Icon,
} from 'native-base';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { increaseQuantity } from '../../../store/modules/actionSheetButton/actions';

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
    <Button rounded="xl" w="40" h="16" bgColor="gray.100">
      <HStack
        w="32"
        justifyContent="space-between"
        alignItems="center"
      >
        <Icon as={MaterialIcons} name="remove" size="2xl" color="gray.400" onPress={handleSubtract} />
        <Text fontSize="xl">{quantity}</Text>
        <Icon as={MaterialIcons} name="add" size="2xl" color="gray.500" onPress={handleAdd} />
      </HStack>
    </Button>
  );
}

function PriceButton({ label, price }: { label: string, price: number }) {
  const quantity = useSelector<RootState, number>((state) => state.actionSheetButton);
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

  return (
    <Button rounded="xl" w="40" h="16" bgColor="black">
      <Text color="white" fontWeight="semibold">{`${label}  ${result}`}</Text>
    </Button>
  );
}

export const ActionSheetButtonBox = Object.assign(Main, {
  QuantityButton, PriceButton,
});
