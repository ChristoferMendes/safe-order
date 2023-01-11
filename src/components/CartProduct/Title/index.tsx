import { Text } from 'native-base';
import { useCartProductContext } from '../store/CartProductContext';

export function Title() {
  const { product} = useCartProductContext();
  
  return (
      <Text>{product.name}</Text>
  );
}
