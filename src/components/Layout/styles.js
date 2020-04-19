import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import logo from '../../assets/fastfeet-logo-white.png';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: #7d40e7;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 254px;
  height: 42px;
  margin-bottom: 50px;
`;

export const Form = styled.View`
  width: 100%;
`;
