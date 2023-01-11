import { MaterialIcons } from '@expo/vector-icons';
import { Text, HStack, VStack, IconButton, Icon, Button } from 'native-base';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useCurrencyConverted } from '../../hooks/useCurrencyConverter/useCurrencyConverter';
import { selectCart } from '../../store/modules/cart/cartSlice';

const { width } = Dimensions.get('window')

export function CartCheckout() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { products: cartProducts } = useSelector(selectCart)
  const currencyConverter = useCurrencyConverted()
  const shipmentPrice = 12;
  const shipmentPriceInUSD = currencyConverter(shipmentPrice)

  const defineFavoriteIcon = isFavorite ? 'favorite' : 'favorite-outline'

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const sumPrice = (acc: number, curr: number) => {
    const discount = 15;
    const priceWithDiscount = curr - (curr * discount / 100);
    return acc + priceWithDiscount;
  }
  const price = cartProducts.map(item => item.quantityRequested * item.price).reduce(sumPrice, 0)
  const priceInUSD = currencyConverter(price);

  const total = price + shipmentPrice;
  const totalInUSD = currencyConverter(total);

  return (
    <HStack position="absolute" bottom={0} h="56" w={"full"} borderTopWidth={0.3} borderColor="gray.400" bgColor={'white'}>
      <VStack
        w="full"
        h="8"
        borderColor="gray.400"
        alignItems={"center"}
        position="relative"
      >
        <HStack alignItems={'center'}>
          <IconButton variant={'unstyled'} icon={<Icon as={MaterialIcons} name={defineFavoriteIcon} color="red.500" />} onPress={toggleFavorite} />
          <Text>Save products as favorites</Text>
        </HStack>
        <VStack w={"full"} ml="4">
          <HStack>
            <Text fontSize={'sm'} fontWeight="semibold">Subtotal</Text>
            <Text ml="5" fontSize={'sm'} fontWeight="semibold">{priceInUSD}</Text>
          </HStack>
          <HStack>
            <Text color="coolGray.400">Shipment</Text>
            <Text ml="3" color="coolGray.400">{shipmentPriceInUSD}</Text>
          </HStack>
          <HStack>
            <Text fontSize={'2xl'} fontWeight="bold">Total</Text>
            <Text ml="4" fontSize={'2xl'} fontWeight="bold">{totalInUSD}</Text>
          </HStack>
        </VStack>
        <HStack bgColor={'tertiary.200'} position="absolute" right={'1'} top="12" rounded={'lg'} p="1">
          <Text w="40" color="black" fontWeight={'semibold'}>Buy more $ {10} dollars and earn free shipment</Text>
        </HStack>
        <VStack h="24">
          <Button
            w={width - 30}
            rounded="3xl"
            bgColor={'blue.600'}
            mt="5"
            _text={{
              fontWeight: 'bold',
            }}
          >
            Checkout
          </Button>
          <HStack mt="2" alignItems={"center"}>
            <Icon as={MaterialIcons} name="local-shipping" />
            <Text fontSize={'12'} ml="2" color="green.600">Receive in the next monday buying until today at 14:00</Text>
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
}
