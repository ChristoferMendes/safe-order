import {
  Box, Button, HStack, Image, Text, useDisclose, View,
} from 'native-base';
import { Dimensions } from 'react-native';
import { IProduct } from '../../store/modules/cart/types';
import { ActionSheet } from '../ActionSheet';

const { width, height } = Dimensions.get('screen');

export function Carousel({ item }: { item: IProduct }) {
  const { isOpen, onClose, onOpen } = useDisclose();

  const handleOpenActionSheet = () => {
    if (isOpen) return;
    onOpen();
  };

  return (
    <View width={width} pt="10" key={item.uuid} position="relative" onTouchEnd={handleOpenActionSheet}>
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
        <Image source={{ uri: item.image }} key={item.uuid} alt="img" size={120} rounded="full" bottom="3.5" />
        <HStack width="full" alignItems="center" justifyContent="space-evenly" my={5}>
          <Text fontWeight="semibold">Image Description</Text>
          <Button rounded="3xl" width={100} bgColor="black" onPress={() => console.log('pressed')}>aaa</Button>
        </HStack>
        <ActionSheet isOpen={isOpen} product={item} onClose={onClose} />
      </Box>
    </View>
  );
}
