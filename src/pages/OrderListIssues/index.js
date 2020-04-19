import React, { useCallback, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { ColorStrip } from '~/pages/OrderDetails/styles';

import { statusbarUpdateColor } from '~/store/modules/statusbar/actions';

import {
  Container,
  OrderDetailsContainer,
  OrderDetailsCard,
  OrderIssuesList,
  OrderIssuesHeader,
  OrderIssueDescription,
  OrderIssueDate,
} from './styles';

export default function OrderListIssues({ route }) {
  const { order, issues } = route.params;
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#7d40e7');
      dispatch(statusbarUpdateColor('#7d40e7'));
    }, [])
  );

  function renderIssue({ item }) {
    return (
      <OrderDetailsCard>
        <OrderIssueDate>
          {format(new Date(item.created_at), 'MM/dd/yyyy')}
        </OrderIssueDate>
        <OrderIssueDescription>{item.full_description}</OrderIssueDescription>
      </OrderDetailsCard>
    );
  }

  return (
    <Container>
      <ColorStrip />
      <OrderDetailsContainer>
        <OrderIssuesHeader>Order #{order.id}</OrderIssuesHeader>
        <OrderIssuesList
          vertical
          data={issues}
          contentContainerStyle={{ paddingBottom: 40 }}
          extraData={this.props}
          keyExtractor={(item) => item.created_at}
          renderItem={renderIssue}
        />
      </OrderDetailsContainer>
    </Container>
  );
}
