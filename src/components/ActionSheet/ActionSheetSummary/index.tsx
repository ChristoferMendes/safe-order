import { View, Text } from 'native-base';

export function ActionSheetSummary({ label }: { label: string }) {
  return (
    <Text fontWeight="bold" fontSize="2xl">{label}</Text>
  );
}
