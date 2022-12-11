import { MaterialIcons } from '@expo/vector-icons';
import {
  View, StatusBar, HStack, IconButton, Icon, Text,
} from 'native-base';

export function Header() {
  return (
    <View>
      <StatusBar backgroundColor="#35c11c" barStyle="light-content" />
      <HStack alignItems="center">
        <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="black" />} />
        <Text>
          Home
        </Text>
      </HStack>

    </View>
  );
}
