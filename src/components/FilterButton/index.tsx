import { Text, Button } from 'native-base';

export function FilterButton({ item }: { item: string }) {
  return (
    <Button mr="2" bgColor="gray.200" _pressed={{ bgColor: 'gray.300' }}>
      <Text>{item}</Text>
    </Button>
  );
}
