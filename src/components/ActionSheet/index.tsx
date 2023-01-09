import {
  Actionsheet as NativeBaseActionSheet,
} from 'native-base';
import { ActionSheetNutrientBox } from './ActionSheetNutrientBox';
import { ProductImage } from '../ProductImage';
import { ActionSheetSummary } from './ActionSheetSummary';
import { ActionSheetDescription } from './ActionSheetDescription';
import { ActionSheetButtonBox } from './ActionSheetButtonBox';
import { IProduct } from '../../store/modules/products/typescript';

interface IActionSheetProps {
  isOpen: boolean;
  product: IProduct
  onClose: () => void
}

export function ActionSheet({ isOpen, product, onClose }: IActionSheetProps) {
  return (
    <NativeBaseActionSheet isOpen={isOpen} onClose={onClose}>
      <NativeBaseActionSheet.Content>
        <NativeBaseActionSheet.Item alignItems="center">
          <ProductImage imageLink={product.image} />
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
            <ActionSheetButtonBox.QuantityButton productUuid={product.uuid} />
            <ActionSheetButtonBox.PriceButton product={product} />
          </ActionSheetButtonBox>
        </NativeBaseActionSheet.Item>
      </NativeBaseActionSheet.Content>
    </NativeBaseActionSheet>
  );
}
