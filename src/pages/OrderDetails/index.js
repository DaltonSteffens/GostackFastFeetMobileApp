import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StatusBar,
  Alert,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from 'react-native';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  orderFetchRequest,
  orderUpdateRequest,
  orderIssuesFetchRequest,
} from '~/store/modules/order/actions';
import { statusbarUpdateColor } from '~/store/modules/statusbar/actions';

import api from '~/services/api';

import {
  Container,
  ColorStrip,
  OrderDetailsContainer,
  OrderLoadingCard,
  OrderDetailsCard,
  OrderDetailsCardHeader,
  OrderDetailsCardHeaderText,
  OrderDetailsCardInfoWrapper,
  OrderDetailsCardInfoTextLarge,
  OrderDetailsCardInfoTextSmall,
  OrderDetailsCardFlex,
  OrderActions,
  OrderActionButton,
  OrderActionButtonText,
} from './styles';

export default function OrderDetails({ route, navigation }) {
  const { id, recipient } = route.params.order;

  const issuesTotal = useSelector((state) => state.order.issuesTotal);
  const issues = useSelector((state) => state.order.issues);
  const order = useSelector((state) => state.order.order);
  const success = useSelector((state) => state.order.success);
  const loading = useSelector((state) => state.order.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderFetchRequest(id));
  }, [success]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#7d40e7');

      dispatch(statusbarUpdateColor('#7d40e7'));

      /* Fetch issues everytime the view is loaded */
      dispatch(orderIssuesFetchRequest(id));

      /* Fetch order everytime the view is loaded */
      dispatch(orderFetchRequest(id));
    }, [])
  );

  function getStatus(order) {
    const { start_date, end_date } = order;
    if (end_date === null && start_date !== null) return 'In Transit';
    if (end_date === null && start_date === null) return 'Waiting for pickup';
    if (end_date !== null) return 'Delivered';
  }

  function handleConfirmPickup(order) {
    const orderParams = {
      id: order.id,
      deliveryman_id: order.deliveryman_id,
    };
    Alert.alert(
      'Are you sure?',
      'Tapping "Yes" will update the order status to "In Transit". You can\'t revert that action.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(orderUpdateRequest('pickup', orderParams)),
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <Container>
      <ColorStrip />
      {!loading ? (
        <OrderDetailsContainer>
          <OrderDetailsCard>
            <OrderDetailsCardHeader>
              <Icon name="local-shipping" color="#7d40e7" size={21} />
              <OrderDetailsCardHeaderText>
                Order Information
              </OrderDetailsCardHeaderText>
            </OrderDetailsCardHeader>
            <OrderDetailsCardInfoWrapper>
              <OrderDetailsCardInfoTextLarge>
                Recipient
              </OrderDetailsCardInfoTextLarge>
              <OrderDetailsCardInfoTextSmall>
                {recipient.name}
              </OrderDetailsCardInfoTextSmall>
            </OrderDetailsCardInfoWrapper>
            <OrderDetailsCardInfoWrapper>
              <OrderDetailsCardInfoTextLarge>
                Address
              </OrderDetailsCardInfoTextLarge>
              <OrderDetailsCardInfoTextSmall>
                {recipient.address}, {recipient.number}
                {recipient.address_2 ? ` - ${recipient.address_2}` : null}
                {'\n'}
                {recipient.city} - {recipient.state} - {recipient.zip_code}
              </OrderDetailsCardInfoTextSmall>
            </OrderDetailsCardInfoWrapper>
            <OrderDetailsCardInfoWrapper>
              <OrderDetailsCardInfoTextLarge>
                Product
              </OrderDetailsCardInfoTextLarge>
              <OrderDetailsCardInfoTextSmall>
                {order.product}
              </OrderDetailsCardInfoTextSmall>
            </OrderDetailsCardInfoWrapper>
          </OrderDetailsCard>
          <OrderDetailsCard>
            <OrderDetailsCardHeader>
              <Icon name="event" color="#7d40e7" size={21} />
              <OrderDetailsCardHeaderText>
                Order Progress
              </OrderDetailsCardHeaderText>
            </OrderDetailsCardHeader>
            <OrderDetailsCardInfoWrapper>
              <OrderDetailsCardInfoTextLarge>
                Status
              </OrderDetailsCardInfoTextLarge>
              <OrderDetailsCardInfoTextSmall>
                {getStatus(order)}
              </OrderDetailsCardInfoTextSmall>
            </OrderDetailsCardInfoWrapper>
            <OrderDetailsCardFlex>
              <OrderDetailsCardInfoWrapper width={60}>
                <OrderDetailsCardInfoTextLarge>
                  Picked up on
                </OrderDetailsCardInfoTextLarge>
                <OrderDetailsCardInfoTextSmall>
                  {order.start_date
                    ? format(new Date(order.start_date), 'MM/dd/yyyy')
                    : '--/--/--'}
                </OrderDetailsCardInfoTextSmall>
              </OrderDetailsCardInfoWrapper>
              <OrderDetailsCardInfoWrapper>
                <OrderDetailsCardInfoTextLarge>
                  Delivered on
                </OrderDetailsCardInfoTextLarge>
                <OrderDetailsCardInfoTextSmall>
                  {order.end_date
                    ? format(new Date(order.end_date), 'MM/dd/yyyy')
                    : '--/--/--'}
                </OrderDetailsCardInfoTextSmall>
              </OrderDetailsCardInfoWrapper>
            </OrderDetailsCardFlex>
          </OrderDetailsCard>
          {order.end_date === null && (
            <OrderActions>
              <OrderActionButton
                first
                width={issuesTotal !== 0 ? 33.3 : 50}
                onPress={() => navigation.navigate('Report Issue', { order })}
              >
                <Icon name="highlight-off" color="#E74040" size={21} />
                <OrderActionButtonText>Report{'\n'}Issue</OrderActionButtonText>
              </OrderActionButton>
              {issuesTotal !== 0 && (
                <OrderActionButton
                  middle
                  width={33.3}
                  onPress={() =>
                    navigation.navigate('List Issues', { order, issues })
                  }
                >
                  <Icon name="error-outline" color="#E7BA40" size={21} />
                  <OrderActionButtonText>
                    List{'\n'}Issues
                  </OrderActionButtonText>
                </OrderActionButton>
              )}
              {order.start_date === null ? (
                <OrderActionButton
                  onPress={() => handleConfirmPickup(order)}
                  width={issuesTotal !== 0 ? 33.3 : 50}
                >
                  <Icon name="done" color="#2CA42B" size={21} />
                  <OrderActionButtonText>
                    Confirm{'\n'}Pickup
                  </OrderActionButtonText>
                </OrderActionButton>
              ) : (
                <OrderActionButton
                  onPress={() =>
                    navigation.navigate('Confirm Delivery', { order })
                  }
                  width={issuesTotal !== 0 ? 33.3 : 50}
                >
                  <Icon name="done-all" color="#7D40E7" size={21} />
                  <OrderActionButtonText>
                    Confirm{'\n'}Delivery
                  </OrderActionButtonText>
                </OrderActionButton>
              )}
            </OrderActions>
          )}
        </OrderDetailsContainer>
      ) : (
        <OrderDetailsContainer>
          <OrderLoadingCard>
            <ActivityIndicator color="#7d40e7" />
          </OrderLoadingCard>
        </OrderDetailsContainer>
      )}
    </Container>
  );
}
