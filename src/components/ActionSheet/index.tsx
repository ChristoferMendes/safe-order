import {
  Actionsheet as NativeBaseActionSheet, Container, Text, View,
} from 'native-base';
import { ActionSheetNutrientBox } from '../ActionSheetNutrientBox';
import { ProductImage } from '../ProductImage';

interface IActionSheetProps {
  isOpen: boolean;
  item: string;
}

export function ActionSheet({ isOpen, item }: IActionSheetProps) {
  return (
    <NativeBaseActionSheet isOpen={isOpen}>
      <NativeBaseActionSheet.Content>
        <NativeBaseActionSheet.Item alignItems="center">
          <ProductImage imageLink={item} />
        </NativeBaseActionSheet.Item>
        <NativeBaseActionSheet.Item>
          <Text fontWeight="bold" fontSize="xl">Fruits with some vegetable</Text>
        </NativeBaseActionSheet.Item>
        <NativeBaseActionSheet.Item>
          <Text color="gray.400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Odit neque sit aspernatur voluptatibus
          </Text>
        </NativeBaseActionSheet.Item>
        <NativeBaseActionSheet.Item>
          <ActionSheetNutrientBox>
            <ActionSheetNutrientBox.Item nutrient="kcal" value={200} />
            <ActionSheetNutrientBox.Item nutrient="grams" value={300} />
            <ActionSheetNutrientBox.Item nutrient="proteins" value={52} />
            <ActionSheetNutrientBox.Item nutrient="fats" value={277} />
            <ActionSheetNutrientBox.Item nutrient="carbs" value={19} />
          </ActionSheetNutrientBox>
        </NativeBaseActionSheet.Item>
      </NativeBaseActionSheet.Content>
    </NativeBaseActionSheet>
  );
}
