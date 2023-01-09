import { MotiImage } from 'moti'
import { HStack, Text, VStack } from 'native-base';

export function CartWithoutProducts() {
  return (
    <VStack>
      <MotiImage
        source={{ uri: 'https://homempizza.com.br/wp-content/uploads/2019/08/pizza.png' }}
        style={{ height: 200 }}
        resizeMode="contain"
        from={{
          rotate: '180deg',
          opacity: 0,
        }}
        animate={{
          rotate: '0deg',
          opacity: 1
        }}
        transition={{
          type: 'timing',
          duration: 2000
        }}
      />
      <HStack justifyContent="center">
        <Text fontSize={"md"} fontWeight="semibold">
          You do not have any product in your cart!
        </Text>
      </HStack>
      <MotiImage
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3649/3649583.png' }}
        style={{ height: 80 }}
        resizeMode="contain"
      />
    </VStack>
  );
}
