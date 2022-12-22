import { View, Text } from 'native-base';

export function ActionSheetDescription({ label }: { label: string }) {
  return (
    <Text color="gray.400" fontSize="sm">
      {label}
    </Text>
  );
}
