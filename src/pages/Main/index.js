import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OrdersStackView from '~/pages/OrdersStackView';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === 'Orders') {
      iconName = 'list';
    } else if (route.name === 'Profile') {
      iconName = 'person';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
});

const tabOptions = {
  activeTintColor: '#7D40E7',
  inactiveTintColor: '#999',
  keyboardHidesTabBar: true,
  style: {
    backgroundColor: '#fff',
    height: 65,
    paddingBottom: 12,
    paddingTop: Platform.OS === 'ios' ? 10 : 15,
  },
  labelStyle: {
    fontSize: 12,
  },
};

export default function Main() {
  const statusbarColor = useSelector((state) => state.statusbar.color);
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: statusbarColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabOptions}>
          <Tab.Screen name="Orders" component={OrdersStackView} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}
