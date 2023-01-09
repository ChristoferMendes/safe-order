import { HStack, Skeleton } from 'native-base';

export function SkeletonProduct() {
  return (
    <HStack space={"6"} mt="2">
      <Skeleton w="24" h="24" />
      <Skeleton.Text w="24" />
    </HStack>
  );
}
