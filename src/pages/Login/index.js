import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, SafeAreaView } from 'react-native';

import { Container, Form, Logo } from './styles';

import { Input, SubmitButton, SubmitButtonText } from '~/components/Layout';

import { loginRequest } from '~/store/modules/auth/actions';

export default function Login() {
  const [deliveryman_id, setDeliverymanId] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(loginRequest(deliveryman_id));
  }

  function handleInputChange(text) {
    setDeliverymanId(text);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7d40e7' }}>
      <Container>
        <Logo />
        <Form>
          <Input
            autoCorrect={false}
            autoCapitaliza="none"
            placeholder="Type in your ID"
            returnKeyType="go"
            value={deliveryman_id}
            onChangeText={(text) => handleInputChange(text)}
          />
          <SubmitButton
            loading={loading}
            onPress={handleSubmit}
            color="#82BF18"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <SubmitButtonText>Access Dashboard</SubmitButtonText>
            )}
          </SubmitButton>
        </Form>
      </Container>
    </SafeAreaView>
  );
}
