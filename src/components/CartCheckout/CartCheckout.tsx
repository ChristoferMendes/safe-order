import { MaterialIcons } from '@expo/vector-icons';
import { Text, HStack, VStack, IconButton, Icon, Button, PresenceTransition } from 'native-base';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrencyConverted } from '../../hooks/useCurrencyConverter/useCurrencyConverter';
import { selectCart, removeProductInCart } from '../../store/modules/cart/cartSlice';


const { width } = Dimensions.get('window')

export function CartCheckout() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { products: cartProducts } = useSelector(selectCart)
  const currencyConverter = useCurrencyConverted()
  const shipmentPrice = 3;
  const numberToReachForFreeShipment = 30;
  const dispatch = useDispatch();

  const defineFavoriteIcon = isFavorite ? 'favorite' : 'favorite-outline'

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const sumPrice = (acc: number, curr: number) => {
    const discount = 15;
    const priceWithDiscount = curr - (curr * discount / 100);
    return acc + priceWithDiscount;
  }

  const subTotal = cartProducts.map(item => item.quantityRequested * item.price).reduce(sumPrice, 0)
  const subTotalInUSD = currencyConverter(subTotal);

  const total = subTotal + shipmentPrice;
  const totalInUSD = currencyConverter(total);

  const subTotalIsLowerOrEqualThanThirty = subTotal <= numberToReachForFreeShipment
  const shipmentFinal = subTotalIsLowerOrEqualThanThirty ? shipmentPrice : 0;
  const shipmentFinalInUsd = currencyConverter(shipmentFinal);
  const missingPriceToFreeShipment = numberToReachForFreeShipment - subTotal;


  const date = new Date();
  const [hours, minutes] = [date.getHours(), date.getMinutes()];
  const hoursSerialized = hours + 1;
  const minutesSerialized = String(minutes + 3)
  const hourToBeShippedSooner = `${hoursSerialized}:${minutesSerialized.padStart(2, '0')}`

  const finalPriceToFreeShipment = missingPriceToFreeShipment <= 0 ? 0 : missingPriceToFreeShipment
  const missingPriceToFreeShipmentInUsd = currencyConverter(finalPriceToFreeShipment);

  const handleCheckout = () => {
    cartProducts.forEach((product) => {
      dispatch(removeProductInCart({ product }))
    })
  }

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
            <Text ml="5" fontSize={'sm'} fontWeight="semibold">{subTotalInUSD}</Text>
          </HStack>
          <HStack>
            <Text color="coolGray.300">Shipment</Text>
            <Text ml="3" color="coolGray.300">{shipmentFinalInUsd}</Text>
          </HStack>
          <HStack>
            <Text fontSize={'2xl'} fontWeight="bold">Total</Text>
            <Text ml="4" fontSize={'2xl'} fontWeight="bold">{totalInUSD}</Text>
          </HStack>
        </VStack>
        <PresenceTransition
          visible={subTotalIsLowerOrEqualThanThirty}
          initial={{
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 250,
            }
          }}
        >
          <HStack left={"2"} bottom="2" position={"absolute"} bgColor={"tertiary.200"} p="1" rounded={"lg"}>
            <Text
              w="40"
              color="black"
              fontWeight={'semibold'}
            >
              Buy more {missingPriceToFreeShipmentInUsd} dollars and earn free shipment!
            </Text>
          </HStack>
        </PresenceTransition>
        <VStack h="24">
          <Button
            w={width - 30}
            rounded="3xl"
            bgColor={'blue.600'}
            mt="5"
            _text={{
              fontWeight: 'bold',
            }}
            onPress={handleCheckout}
            _pressed={{
              bgColor: 'green.400'
            }}
          >
            Checkout
          </Button>
          <HStack mt="2" alignItems={"center"} justifyContent="center">
            <Icon as={MaterialIcons} name="local-shipping" color={"black"} mt="auto" />
            <Text fontSize={'12'} ml="2" color="green.600">Receive in the next monday buying until today at {hourToBeShippedSooner}</Text>
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
}
