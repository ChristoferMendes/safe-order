/* eslint-disable react/jsx-props-no-spreading */
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Text, HStack, VStack, Pressable, Icon,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { invalidateToken } from '../../store/modules/token/actions';

type IconKeys = 'Home' | 'Settings'
type IconValues = {
  Home: 'home',
  Settings: 'settings'
}

export function CustomDrawer(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const dispatch = useDispatch();

  const handleNavigate = (name: string) => {
    navigation.navigate(name);
  };

  const getIcon = (name: string) => {
    const keyName = name as IconKeys;
    const icons = {
      Home: 'home',
      Settings: 'settings',
      ShoppingCart: 'shopping-cart',
    } as IconValues;

    return icons[keyName];
  };

  const isCurrentPage = (index: number) => index === state.index;

  const removeTokenFromStorage = async () => {
    await AsyncStorage.removeItem('@storage_token');
  };

  const handleLogout = () => {
    removeTokenFromStorage();
    dispatch(invalidateToken());
  };

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
              isCurrentPage(index)
                ? 'rgba(6, 182, 212, 0.1)'
                : 'transparent'
            }
            onPress={() => handleNavigate(name)}
          >
            <HStack space="7" alignItems="center">
              <Icon
                color={
                  isCurrentPage(index) ? 'primary.500' : 'gray.500'
                }
                size="5"
                as={<MaterialIcons name={getIcon(name)} />}
              />
              <Text
                fontWeight="500"
                color={
                  isCurrentPage(index) ? 'primary.500' : 'gray.700'
                }
              >
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
        <Pressable
          px={5}
          py={3}
          rounded="md"
        >
          <HStack
            space="7"
            alignItems="center"
            onTouchStart={handleLogout}
          >
            <Icon
              size="5"
              as={<MaterialIcons name="logout" />}
            />
            <Text>Logout</Text>
          </HStack>
        </Pressable>
      </VStack>
    </DrawerContentScrollView>
  );
}
