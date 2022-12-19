import {
  Box, Button, HStack, Image, Text, View,
} from 'native-base';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export function Carousel({ item }: { item: string }) {
  return (
    <View width={width} pt="10" key={item} position="relative">
      <Box
        bg={{
          linearGradient: {
            colors: ['lightBlue.300', 'violet.500'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        width={width / 1.2}
        mx="auto"
        minH={height / 5}
        rounded="2xl"
        display="flex"
        alignItems="center"
      >
        <Image source={{ uri: item }} key={item} alt="img" size={120} rounded="lg" bottom="1.5" />
        <HStack width="full" alignItems="center" justifyContent="space-evenly" my={5}>
          <Text fontWeight="semibold">Image Description</Text>
          <Button rounded="3xl" width={100} bgColor="black" onPress={() => console.log('pressed')}>aaa</Button>
        </HStack>
      </Box>
    </View>
  );
}
