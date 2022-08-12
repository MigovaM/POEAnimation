import React from 'react';
import {Screen} from './src/screens/Screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Screen />
    </SafeAreaProvider>
  );
};

export default App;
