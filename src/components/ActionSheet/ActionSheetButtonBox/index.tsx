import {
  View, Text, HStack, Button,
} from 'native-base';
import { ReactNode } from 'react';

function Main({ children }: { children: ReactNode }) {
  return (
    <HStack
      w="xs"
      display="flex"
      justifyContent="center"
      space="3"
    >
      {children}
    </HStack>
  );
}

function QuantityButton({ label }: { label: string }) {
  return (
    <Button rounded="xl" w="40" h="16" bgColor="gray.100">
      <Text color="black">{label}</Text>
    </Button>
  );
}

function PriceButton({ label, price }: { label: string, price: number }) {
  return (
    <Button rounded="xl" w="40" h="16" bgColor="black">
      <Text color="white" fontWeight="semibold">{`${label}  ${price}`}</Text>
    </Button>
  );
}

export const ActionSheetButtonBox = Object.assign(Main, {
  QuantityButton, PriceButton,
});
