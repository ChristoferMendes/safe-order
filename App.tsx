import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { store } from './src/store';
import { Router } from './src/routes';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider config={config}>
          <Router />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
