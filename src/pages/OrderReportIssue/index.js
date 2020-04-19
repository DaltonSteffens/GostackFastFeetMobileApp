import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { issueCreateRequest } from '~/store/modules/issue/actions';
import { statusbarUpdateColor } from '~/store/modules/statusbar/actions';

import {
  Container,
  ColorStrip,
  OrderDetailsContainer,
  OrderDetailsCard,
} from '~/pages/OrderDetails/styles';

import { Input, SubmitButton, SubmitButtonText } from '~/components/Layout';

export default function OrderReportIssue({ route, navigation }) {
  const { order } = route.params;
  const [issue, setIssue] = useState('');
  const loading = useSelector((state) => state.issue.loading);
  const success = useSelector((state) => state.issue.success);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      navigation.goBack();
    }
  }, [success]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#7d40e7');
      dispatch(statusbarUpdateColor('#7d40e7'));
    }, [])
  );

  function handleSubmit() {
    const issueParams = {
      id: order.id,
      full_description: issue,
    };
    dispatch(issueCreateRequest(issueParams));
  }

  function handleInputChange(text) {
    setIssue(text);
  }

  return (
    <Container>
      <ColorStrip />
      <OrderDetailsContainer>
        <OrderDetailsCard>
          <Input
            autoCorrect
            placeholder="Let us know what went wrong with this order"
            value={issue}
            multiline
            noPadding
            noBorder
            alignTextTop
            height={200}
            transparent
            numberOfLines={15}
            onChangeText={(text) => handleInputChange(text)}
          />
        </OrderDetailsCard>
        <SubmitButton loading={loading} onPress={handleSubmit} color="#7d40e7">
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <SubmitButtonText>Send</SubmitButtonText>
          )}
        </SubmitButton>
      </OrderDetailsContainer>
    </Container>
  );
}
