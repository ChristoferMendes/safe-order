import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

export function Notification() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
