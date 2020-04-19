import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  OrderTileContainer,
  OrderHeader,
  OrderHeaderTitle,
  OrderFooter,
  OrderFooterInfo,
  OrderFooterSmall,
  OrderFooterLarge,
  OrderFooterAction,
  OrderDetailsText,
  OrderStatus,
  OrderStatusFlex,
  OrderStatusTextFlex,
  OrderStatusLine,
  OrderStatusIndicator,
  OrderStatusText,
} from './styles';

const ANIMATION_DURATION = 300;
const ANIMATION_DELAY = 100;

export default function OrderTile({ index, order, navigation }) {
  const orderComplete = order.end_date !== null;
  const [animated] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      delay: index * ANIMATION_DELAY,
    }).start();
  }, [order]);

  const styleTransform = [
    {
      translateY: animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['25px', '0px'],
      }),
    },
  ];

  const tileStyles = [
    { opacity: animated },
    {
      transform: Platform.OS === 'ios' ? styleTransform : [],
    },
  ];

  return (
    <Animated.View style={tileStyles}>
      <OrderTileContainer
        onPress={() => navigation.navigate('Order Details', { order })}
      >
        <OrderHeader>
          <Icon
            name="local-shipping"
            color={orderComplete ? '#2CA42B' : '#7d40e7'}
            size={21}
          />
          <OrderHeaderTitle delivered={orderComplete}>
            Order #{order.id}
          </OrderHeaderTitle>
        </OrderHeader>
        <OrderStatus>
          <OrderStatusFlex>
            <OrderStatusLine />
            <OrderStatusIndicator active />
            <OrderStatusIndicator active={order.start_date !== null} />
            <OrderStatusIndicator active={order.end_date !== null} />
          </OrderStatusFlex>
          <OrderStatusTextFlex>
            <OrderStatusText>Waiting for pickup</OrderStatusText>
            <OrderStatusText>In Transit</OrderStatusText>
            <OrderStatusText>Delivered</OrderStatusText>
          </OrderStatusTextFlex>
        </OrderStatus>
        <OrderFooter>
          <OrderFooterInfo>
            <OrderFooterSmall>Date</OrderFooterSmall>
            <OrderFooterLarge>
              {order.start_date !== null
                ? format(new Date(order.start_date), 'MM/dd/yyyy')
                : 'Not started'}
            </OrderFooterLarge>
          </OrderFooterInfo>
          <OrderFooterInfo>
            <OrderFooterSmall>City</OrderFooterSmall>
            <OrderFooterLarge>{order.recipient.city}</OrderFooterLarge>
          </OrderFooterInfo>
          <OrderFooterAction>
            <OrderDetailsText>Details</OrderDetailsText>
          </OrderFooterAction>
        </OrderFooter>
      </OrderTileContainer>
    </Animated.View>
  );
}

OrderTile.propTypes = {
  index: PropTypes.number.isRequired,
  order: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
