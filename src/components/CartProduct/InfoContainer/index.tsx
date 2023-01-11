import { VStack } from 'native-base';
import { ReactNode } from 'react';

export function InfoContainer({ children }: { children: ReactNode }) {
  return (
    <VStack ml="2" mt="8">
      {children}
    </VStack>
  );
}
