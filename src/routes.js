import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '~/pages/Login';
import Main from '~/pages/Main';

const Stack = createStackNavigator();

export default function Routes() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <Stack.Navigator>
      {loggedIn === false ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
