import { HStack, Text, VStack } from 'native-base';
import { useCurrencyConverted } from '../../../hooks/useCurrencyConverter/useCurrencyConverter';
import { useCartProductContext } from '../store/CartProductContext';

export function Price() {
  const { product } = useCartProductContext();
  const priceTimesQuantity = product.price * product.quantityRequested;
  const currencyConverter = useCurrencyConverted();

  const fullPrice = currencyConverter(priceTimesQuantity);

  const discount = 15;
  const discountToDecimal = discount / 100
  const discountPrice = priceTimesQuantity - (priceTimesQuantity * discountToDecimal);
  const discountPriceUSDString = currencyConverter(discountPrice);

  const discountPriceWithoutDolarSign = discountPriceUSDString.replace('$', '')

  const [intDiscount, decimalDiscount] = discountPriceWithoutDolarSign.split('.')


  return (
    <HStack alignItems={'center'}>
      <VStack>
        <Text strikeThrough>{fullPrice}</Text>
        <HStack>
          <Text fontSize={'2xl'} fontWeight="bold">$</Text>
          <Text fontSize={'2xl'} fontWeight="bold">{intDiscount}</Text>
          <Text fontSize={'2xl'}>.</Text>
          <Text fontSize={'lg'} mt="auto" color={'gray.300'}>{decimalDiscount}</Text>
        </HStack>
      </VStack>
      <HStack mt='auto' ml="4" bgColor={'red.400'} w="12" justifyContent={'center'}>
        <Text color="white" fontWeight={'semibold'}>-{discount}%</Text>
      </HStack>
    </HStack>
  );
}
