import { Image } from 'native-base';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';

interface IProductImageProps {
  imageLink: string;
  size?: number;
  alt?: string;
  rounded?: ResponsiveValue<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | 'full' | (string & {}) | (number & {}) | 'none' | '3xl'>
}

export function ProductImage({
  imageLink, size = 120, alt = '', rounded = 'full',
}: IProductImageProps) {
  return (
    <Image source={{ uri: imageLink }} alt={alt} size={size} rounded={rounded} />
  );
}
