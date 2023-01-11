import { Text, HStack, Button, useToast, Box, IconButton as NativeBaseIconButon, Icon, View } from 'native-base';
import { useEffect, useState } from 'react';
import { useCartProductContext } from '../store/CartProductContext';
import { removeProductInCart, updateProductInCart } from '../../../store/modules/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

export function ButtonsQuantity() {
  const { product } = useCartProductContext()
  const [quantityRequested, setQuantityRequested] = useState(product.quantityRequested);
  const dispatch = useDispatch();
  const toast = useToast();

  const decreaseQuantity = () => {
    if (quantityRequested === 1) return;
    setQuantityRequested(prev => prev - 1)
  }

  const increaseQuantity = () => {
    if (quantityRequested >= product.quantity) return maximumQuantityToastWarn()
    setQuantityRequested(prev => prev + 1)
  }

  const maximumQuantityToastWarn = () => {
    return toast.show({
      render: () => (
        <Box
          bgColor={'green.400'}
          px="2" py="3"
          _text={{
            color: 'white'
          }}
          rounded="sm"
        >
          Maximum quantity for this product!
        </Box>
      )

    })
  }

  useEffect(() => {
    dispatch(updateProductInCart({ product, quantity: quantityRequested }))
  }, [quantityRequested])

  const removeProductFromCart = () => {
    dispatch(removeProductInCart({ product }))
  }

  return (
    <HStack alignItems={'center'} space="2" mt="2">
      <HStack
        alignItems="center"
        justifyContent={"space-between"}
        borderWidth={0.3} w={"20"}
        rounded="sm"
        borderColor={"gray.600"}
      >
        <IconButton onPress={decreaseQuantity} name="remove" />
        <Text>{quantityRequested}</Text>
        <IconButton onPress={increaseQuantity} name="add" />
      </HStack>
      <Button
        fontSize={'12'}
        color='danger.500'
        onPress={removeProductFromCart}
        variant="ghost"
        _text={{
          color: 'red.500',
          fontSize: 12
        }}
      >
        {'Remove'}
      </Button>
    </HStack>
  );
}

function IconButton({ onPress, name }: { onPress: () => void, name: keyof typeof MaterialIcons.glyphMap }) {
  return (
    <NativeBaseIconButon
      size={'7'}
      variant="ghost"
      borderRadius={0}
      onPress={onPress}
      icon={<Icon as={MaterialIcons} name={name} color={"gray.500"} />}
      _pressed={{
        backgroundColor: 'transparent',
        _icon: {
          color: name === 'add' ? 'green.600' : 'red.300'
        }
      }}
    />
  )
}
