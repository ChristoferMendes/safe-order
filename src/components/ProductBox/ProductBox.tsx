import {
  View, Text, HStack, Image, VStack, useDisclose,
} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import { ActionSheet } from '../ActionSheet';

export function ProductBox({ item }: { item: string }) {
  const {
    isOpen, onOpen, onClose,
  } = useDisclose();
  console.log(isOpen);

  return (
    <TouchableWithoutFeedback>
      <HStack mx={10} onTouchEnd={onOpen}>
        <View>
          <Image source={{ uri: item }} size={120} alt="" rounded="full" />
        </View>
        <VStack justifyContent="center" space={3}>
          <View>
            <Text maxW={160}>Vegetables with some....dsaddasdsadasdsadassaSasASaa</Text>
          </View>
          <HStack pl={3} justifyContent="space-around">
            <Text fontWeight="semibold">$45.00</Text>
            <Text color="gray.300">325 Kcal</Text>
          </HStack>
        </VStack>
        <ActionSheet isOpen={isOpen} item={item} onClose={onClose} />
      </HStack>
    </TouchableWithoutFeedback>
  );
}
