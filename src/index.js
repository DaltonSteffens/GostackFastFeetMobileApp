import 'react-native-gesture-handler';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Routes from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
