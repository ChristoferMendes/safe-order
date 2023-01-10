import { HStack, Skeleton, VStack } from 'native-base';
import { SkeletonProduct } from './SkeletonProduct';
import { SkeletonCarousel } from './SkeletonCarousel';
import { SkeletonCarouselDot } from './SkeletonCarouselDot';
import { SkeletonFilter } from './SkeletonFilter';

export function HomeSkeleton({ loading }: { loading: boolean }) {
  return (
    <>
      <Skeleton isLoaded={loading} display={"none"}>
        <VStack alignItems={"center"} mt="8">
          <SkeletonCarousel />
          <HStack space={"2"} mt="2">
            <SkeletonCarouselDot />
            <SkeletonCarouselDot />
            <SkeletonCarouselDot />
            <SkeletonCarouselDot />
          </HStack>
        </VStack>
        <HStack justifyContent={"center"} mt="6" space={"2"}>
          <SkeletonFilter />
          <SkeletonFilter />
          <SkeletonFilter />
          <SkeletonFilter />
        </HStack>
        <VStack mx="10" mt="6">
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
        </VStack>
      </Skeleton>
    </>
  );
}
