import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

/* Form stuff */
export const Input = styled.TextInput.attrs({ placeholderTextColor: '#999' })`
  height: 45px;
  margin-bottom: 20px;
  background: ${(props) => (props.transparent ? 'transparent' : '#eee')};
  font-size: 16px;
  border-radius: 4px;
  padding: 0 15px;
  justify-content: center;
  text-align-vertical: ${(props) => (props.alignTextTop ? 'top' : 'center')};
  border: ${(props) => (props.noBorder ? 'none' : '1px solid #eee')};
  height: ${(props) => (props.height ? `${props.height}px` : '45px')};
  ${(props) =>
    props.noPadding &&
    css`
      padding: 0px;
    `}
`;

export const SubmitButton = styled(RectButton)`
  height: 45px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.color};
  border-radius: 4px;
  padding: 0 12px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
