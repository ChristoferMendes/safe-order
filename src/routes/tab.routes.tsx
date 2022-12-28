import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon as NativeBaseIcon } from 'native-base';
import { Home } from '../screens/Home';
import { Settings } from '../screens/Settings';
import { ShoppingCart } from '../screens/ShoppingCart';

const Tab = createBottomTabNavigator();

function Icon({ size, color, name }: { size: number, color: string, name: string }) {
  return <NativeBaseIcon size={size} color={color} as={MaterialIcons} name={name} />;
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue.500',
        tabBarLabelStyle: {
          backgroundColor: 'red.200',
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarShowLabel: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => Icon({ size, color, name: 'home' }),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ShoppingCart}
        options={{
          tabBarIcon: ({ size, color }) => Icon({ size, color, name: 'shopping-cart' }),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ size, color }) => Icon({ size, color, name: 'settings' }),
        }}
      />
    </Tab.Navigator>
  );
}
