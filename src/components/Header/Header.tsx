import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  View, StatusBar, HStack, IconButton, Icon, Text,
} from 'native-base';

export function Header() {
  return (
    <View>
      <StatusBar backgroundColor="#35c11c" barStyle="light-content" />
    </View>
  );
}
