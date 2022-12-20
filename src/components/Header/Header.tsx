import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  View, StatusBar, HStack, IconButton, Icon, Text,
} from 'native-base';

export function Header() {
  const navigation = useNavigation();
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <View>
      <StatusBar backgroundColor="#35c11c" barStyle="light-content" />
      <HStack alignItems="center" justifyContent="space-between">
        <IconButton
          icon={(
            <Icon
              size="lg"
              as={MaterialIcons}
              name="menu"
              color="black"
            />
          )}
          onPress={openDrawer}
        />
        <View bgColor="black" w="2xs" borderRadius="2xl">
          <Text fontSize={20} fontWeight="bold" textAlign="center" color="gray.100">
            Safe Order
          </Text>
        </View>
        <IconButton icon={<Icon size="lg" as={MaterialIcons} name="search" color="black" />} />
      </HStack>
    </View>
  );
}
