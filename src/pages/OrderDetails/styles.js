import styled, { css } from 'styled-components/native';

export const Container = styled.ScrollView`
  position: relative;
`;

export const ColorStrip = styled.View`
  height: 420px;
  width: 100%;
  top: -310px;
  left: 0;
  background: #7d40e7;
`;

export const OrderDetailsContainer = styled.View`
  padding: 20px;
  margin-top: -410px;
`;

export const OrderDetailsCard = styled.View`
  padding: 20px;
  padding-bottom: 0px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

export const OrderLoadingCard = styled.View`
  padding: 65px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

export const OrderDetailsCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const OrderDetailsCardHeaderText = styled.Text`
  margin-left: 10px;
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
`;

export const OrderDetailsCardInfoWrapper = styled.View`
  margin-bottom: 10px;
  width: ${(props) => (props.width ? `${props.width}%` : 'auto')};
`;

export const OrderDetailsCardInfoTextLarge = styled.Text`
  font-size: 14px;
  color: #999;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const OrderDetailsCardInfoTextSmall = styled.Text`
  font-size: 14px;
  color: #444;
  line-height: 21px;
  margin-bottom: 8px;
`;

export const OrderDetailsCardFlex = styled.View`
  flex-direction: row;
`;

export const OrderActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #f8f9fd;
  border-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

export const OrderActionButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  width: ${(props) => `${props.width}%`};
  ${(props) =>
    props.first &&
    css`
      border-right-width: 1px;
      border-right-color: rgba(0, 0, 0, 0.1);
    `}
  ${(props) =>
    props.middle &&
    css`
      border-right-width: 1px;
      border-right-color: rgba(0, 0, 0, 0.1);
    `}
`;

export const OrderActionButtonText = styled.Text`
  text-align: center;
  font-size: 12px;
  margin-top: 6px;
  color: #999;
`;
