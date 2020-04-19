import React, { useState, useCallback } from 'react';
import { StatusBar, Text, SafeAreaView, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ProfileHeader,
  ProfileInfo,
  ProfileWelcome,
  ProfileName,
  LogoutButton,
  OrdersFlatList,
  OrdersHeader,
  OrdersHeaderTitle,
  OrdersFilter,
  OrdersFilterButton,
  OrdersFilterButtonText,
} from './styles';

import OrderTile from '~/components/OrderTile';

import { logOut } from '~/store/modules/auth/actions';
import { statusbarUpdateColor } from '~/store/modules/statusbar/actions';

import ProfileAvatar from '~/components/ProfileAvatar';

import { orderFetchAllRequest } from '~/store/modules/order/actions';

export default function OrdersList({ navigation }) {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [ordersFilter, setOrdersFilter] = useState('pending');
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const orders = useSelector((state) => state.order.orders);
  const ordersTotal = useSelector((state) => state.order.ordersTotal);

  function fetchMoreOrders() {
    // console.tron.log('ORDERS!', page, ordersTotal, orders.length);
    if (orders.length < ordersTotal) {
      setFetchingMore(true);
      setPage(page + 1);
      // console.tron.log('FETCH MORE!');
      fetchOrders();
    } else {
      setFetchingMore(false);
      // console.tron.log('LAST PAGE!');
    }
  }

  function refreshOrders() {
    // console.tron.log('REFRESH ORDERS!');
    setPage(1);
    fetchOrders();
  }

  async function fetchOrders() {
    const ordersParams = {
      page,
      deliveryman_id: user.id,
      status: ordersFilter,
    };
    dispatch(orderFetchAllRequest(ordersParams));
  }
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#fff');

      dispatch(statusbarUpdateColor('#fff'));

      /* Fetch orders everytime view is loaded */
      fetchOrders();
    }, [ordersFilter])
  );

  function handleLogout() {
    dispatch(logOut());
  }

  function renderOrderTile(item) {
    return (
      <OrderTile index={item.index} order={item.item} navigation={navigation} />
    );
  }

  function toggleFilter(status) {
    setPage(1);
    setOrdersFilter(status);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        {user !== null && (
          <ProfileHeader>
            <ProfileAvatar profile={user} />
            <ProfileInfo>
              <ProfileWelcome>Welcome back,</ProfileWelcome>
              <ProfileName>{user.name}</ProfileName>
            </ProfileInfo>
            <LogoutButton onPress={handleLogout}>
              <Icon name="exit-to-app" size={26} color="#E74040" />
            </LogoutButton>
          </ProfileHeader>
        )}
        <OrdersHeader>
          <OrdersHeaderTitle>Orders</OrdersHeaderTitle>
          <OrdersFilter>
            <OrdersFilterButton
              onPress={() => toggleFilter('pending')}
              active={ordersFilter === 'pending'}
              color="#7d40e7"
            >
              <OrdersFilterButtonText
                active={ordersFilter === 'pending'}
                color="#7d40e7"
              >
                Pending
              </OrdersFilterButtonText>
            </OrdersFilterButton>
            <OrdersFilterButton
              onPress={() => toggleFilter('delivered')}
              active={ordersFilter === 'delivered'}
              color="#2CA42B"
            >
              <OrdersFilterButtonText
                active={ordersFilter === 'delivered'}
                color="#2CA42B"
              >
                Delivered
              </OrdersFilterButtonText>
            </OrdersFilterButton>
          </OrdersFilter>
        </OrdersHeader>
        {loading && page === 1 ? (
          <Text style={{ color: '#999', padding: 20, fontSize: 12 }}>
            Fetching orders...
          </Text>
        ) : (
          <OrdersFlatList
            vertical
            contentContainerStyle={{ padding: 20 }}
            data={orders}
            refreshing={refreshing}
            onRefresh={refreshOrders}
            onEndReachedThreshold={0.3}
            onEndReached={fetchMoreOrders}
            ListFooterComponent={
              fetchingMore && <ActivityIndicator color="#7d40e7" />
            }
            ListEmptyComponent={
              <Text style={{ color: '#999', fontSize: 12 }}>
                No orders were found
              </Text>
            }
            keyExtractor={(item) => String(item.id)}
            renderItem={renderOrderTile}
          />
        )}
      </Container>
    </SafeAreaView>
  );
}
