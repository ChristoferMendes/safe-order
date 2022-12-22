import {
  Actionsheet as NativeBaseActionSheet,
} from 'native-base';
import { ActionSheetNutrientBox } from './ActionSheetNutrientBox';
import { ProductImage } from '../ProductImage';
import { ActionSheetSummary } from './ActionSheetSummary';
import { ActionSheetDescription } from './ActionSheetDescription';
import { ActionSheetButtonBox } from './ActionSheetButtonBox';
import { IProduct } from '../ProductsList/types';

interface IActionSheetProps {
  isOpen: boolean;
  item: IProduct
  onClose: () => void
}

export function ActionSheet({ isOpen, item, onClose }: IActionSheetProps) {
  return (
    <NativeBaseActionSheet isOpen={isOpen} onClose={onClose}>
      <NativeBaseActionSheet.Content>
        <NativeBaseActionSheet.Item alignItems="center">
          <ProductImage imageLink={item.image} />
        </NativeBaseActionSheet.Item>
        <NativeBaseActionSheet.Item>
          <ActionSheetSummary label="Vegetables with some fruits" />
        </NativeBaseActionSheet.Item>
        <NativeBaseActionSheet.Item>
          <ActionSheetDescription
            label="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Odit neque sit aspernatur voluptatibus"
          />
        </NativeBaseActionSheet.Item>
        <NativeBaseActionSheet.Item alignItems="center">
          <ActionSheetNutrientBox>
            <ActionSheetNutrientBox.Item nutrient="kcal" value={200} />
            <ActionSheetNutrientBox.Item nutrient="grams" value={300} />
            <ActionSheetNutrientBox.Item nutrient="proteins" value={52} />
            <ActionSheetNutrientBox.Item nutrient="fats" value={277} />
            <ActionSheetNutrientBox.Item nutrient="carbs" value={19} />
          </ActionSheetNutrientBox>
        </NativeBaseActionSheet.Item>
        <NativeBaseActionSheet.Item alignItems="center">
          <ActionSheetButtonBox>
            <ActionSheetButtonBox.QuantityButton />
            <ActionSheetButtonBox.PriceButton label="Add to cart" price={47} productUUID={item.uuid} />
          </ActionSheetButtonBox>
        </NativeBaseActionSheet.Item>
      </NativeBaseActionSheet.Content>
    </NativeBaseActionSheet>
  );
}