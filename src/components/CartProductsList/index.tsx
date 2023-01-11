import { View } from 'native-base';
import { ICartProduct } from '../../store/modules/cart/typescript/interfaces';
import { CartProduct } from '../CartProduct';
import { ProductImage } from '../ProductImage';


export function CartProductsList({ product }: { product: ICartProduct }) {


  return (
    <View>
      <CartProduct product={product}>
        <ProductImage imageLink={product.image_url} />
        <CartProduct.InfoContainer>
          <CartProduct.Title />
          <CartProduct.Price />
          <CartProduct.ButtonsQuantity />
        </CartProduct.InfoContainer>
      </CartProduct>
    </View>
  );
}
