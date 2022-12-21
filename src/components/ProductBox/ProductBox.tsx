import {
  View, Text, HStack, Image, VStack, ScrollView,
} from 'native-base';

export function ProductBox({ item }: { item: string }) {
  return (
    <HStack mx={10}>
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
    </HStack>
  );
}
