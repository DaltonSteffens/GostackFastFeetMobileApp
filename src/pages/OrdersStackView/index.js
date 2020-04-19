import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import OrderConfirm from '~/pages/OrderConfirm';
import OrderDetails from '~/pages/OrderDetails';
import OrderListIssues from '~/pages/OrderListIssues';
import OrderReportIssue from '~/pages/OrderReportIssue';
import OrdersList from '~/pages/OrdersList';

const OrdersStack = createStackNavigator();

const orderInnerViews = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 15 }}
    >
      <Icon name="chevron-left" color="#fff" size={24} />
    </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor: '#7D40E7',
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTintColor: '#fff',
});

export default function OrdersStackView() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Orders List"
        component={OrdersList}
        options={{ headerShown: false }}
      />
      <OrdersStack.Screen
        name="Order Details"
        options={orderInnerViews}
        component={OrderDetails}
      />
      <OrdersStack.Screen
        name="Report Issue"
        options={orderInnerViews}
        component={OrderReportIssue}
      />
      <OrdersStack.Screen
        name="List Issues"
        options={orderInnerViews}
        component={OrderListIssues}
      />
      <OrdersStack.Screen
        name="Confirm Delivery"
        options={orderInnerViews}
        component={OrderConfirm}
      />
    </OrdersStack.Navigator>
  );
}
