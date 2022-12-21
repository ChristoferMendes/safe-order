/* eslint-disable react/jsx-props-no-spreading */
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Text, HStack, VStack, Pressable, Icon,
} from 'native-base';

type IconKeys = 'Home' | 'Settings'
type IconValues = {
  Home: 'home',
  Settings: 'settings'
}

export function CustomDrawer(props: DrawerContentComponentProps) {
  const { state, navigation } = props;

  const handleNavigate = (name: string) => {
    navigation.navigate(name);
  };

  const getIcon = (name: string) => {
    const keyName = name as IconKeys;
    const icons = {
      Home: 'home',
      Settings: 'settings',
    } as IconValues;

    return icons[keyName];
  };

  console.log(props);
  return (
    <DrawerContentScrollView {...props}>
      <VStack space={6}>
        {state.routeNames.map((name, index) => (
          <Pressable
            key={name}
            px={5}
            py={3}
            rounded="md"
            bg={
              index === state.index
                ? 'rgba(6, 182, 212, 0.1)'
                : 'transparent'
            }
            onPress={() => handleNavigate(name)}
          >
            <HStack space="7" alignItems="center">
              <Icon
                color={
                  index === state.index ? 'primary.500' : 'gray.500'
                }
                size="5"
                as={<MaterialIcons name={getIcon(name)} />}
              />
              <Text
                fontWeight="500"
                color={
                  index === state.index ? 'primary.500' : 'gray.700'
                }
              >
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  );
}
