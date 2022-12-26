/* eslint-disable consistent-return */
import 'intl';
import 'intl/locale-data/jsonp/en';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Text, HStack, Button, Icon, useToast, Box,
} from 'native-base';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { increaseQuantity } from '../../../store/modules/actionSheetButton/actions';
import { removeProductInCart, storeProductInCart, updateProductInCart } from '../../../store/modules/cart/actions';
import { IProduct } from '../../ProductsList/types';
import { ICart } from '../../../store/modules/cart/interfaces';

type ButtonState = { quantity: number };
type Cart = { products: IProduct[] }

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
  const cart = useSelector<RootState, Cart>((state) => state.cart);
  const productExists = cart?.products.find((item) => item.uuid.match(productUuid));
  const [quantity, setQuantity] = useState(productExists?.quantityRequested ?? 1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (quantity === 0 && productExists) {
      dispatch(removeProductInCart(productUuid));
      return;
    }

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
  const cart = useSelector<RootState, ICart>((state) => state.cart);
  const dispatch = useDispatch();
  const toast = useToast();

  const currencyConverter = (value: number) => {
    const lang = 'en-US';
    const style = 'currency';
    const currency = 'USD';

    const currencyToBeFormated = new Intl.NumberFormat(lang, {
      style,
      currency,
    });

    return currencyToBeFormated.format(value);
  };

  const priceTimesQuantity = product.price * quantity;
  const result = currencyConverter(priceTimesQuantity || product.price);

  const showToast = (message = '') => {
    const durationInMiliseconds = 1000;

    return toast.show({
      placement: 'top',
      duration: durationInMiliseconds,
      accessibilityAnnouncement: message,
      render: () => (
        <Box bg="green.400" px="7" py="4" rounded="xl" mb={5}>
          <Text color="white">
            {message}
          </Text>
        </Box>
      ),
    });
  };

  const handleAddToCart = () => {
    if (quantity === 0) return showToast('Please, add a quantity');

    const productExist = cart?.products.some((item) => item.uuid === product.uuid);
    if (!productExist) {
      showToast(`Product ${product.uuid} added to your cart!`);
      return dispatch(storeProductInCart(product, quantity));
    }

    showToast('Product quantity updated!');
    return dispatch(updateProductInCart(product, quantity));
  };

  const buttonLabel = `Add to cart ${result}`;

  return (
    <Button
      rounded="xl"
      w="40"
      h="16"
      bgColor="gray.900"
      _pressed={{
        backgroundColor: 'gray.700',
      }}
      onPress={handleAddToCart}
    >
      {buttonLabel}
    </Button>
  );
}

export const ActionSheetButtonBox = Object.assign(Main, {
  QuantityButton, PriceButton,
});
