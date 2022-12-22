import { Box, HStack, Text } from 'native-base';
import { ReactNode } from 'react';

type Nutrient = 'kcal' | 'grams' | 'proteins' | 'fats' | 'carbs'

interface IActionSheetProductBox {
  value: number;
  nutrient: Nutrient
}

function Main({ children }: { children: ReactNode }) {
  return (
    <HStack
      space="2"
      display="flex"
      justifyContent="space-around"
      borderWidth={1}
      borderColor="gray.200"
      h="20"
      borderRadius="xl"
      alignItems="center"
      p="3"
      w="xs"
    >
      {children}
    </HStack>
  );
}

function Item({ value, nutrient }: IActionSheetProductBox) {
  return (
    <Box>
      <Text fontWeight="bold" textAlign="center" fontSize="xl">{value}</Text>
      <Text color="warmGray.400">{nutrient}</Text>
    </Box>
  );
}

export const ActionSheetNutrientBox = Object.assign(Main, {
  Item,
});
