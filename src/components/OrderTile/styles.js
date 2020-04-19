import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const OrderTileContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  margin-bottom: 30px;
  border-radius: 4px;
  background-color: #fff;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  /* Add border color instead of shadow because it looks weird with animation */
  border: ${Platform.OS === 'android' ? '2px solid rgba(0,0,0,.04)' : 'none'};
`;

export const OrderHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OrderHeaderTitle = styled.Text`
  color: ${(props) => (props.delivered ? '#2CA42B' : '#7d40e7')};
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
`;

export const OrderFooter = styled.View`
  flex-direction: row;
  background-color: #f8f9fd;
`;

export const OrderFooterInfo = styled.View`
  padding: 20px;
  width: 33.3%;
`;

export const OrderFooterSmall = styled.Text`
  color: #999;
  font-size: 8px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const OrderFooterLarge = styled.Text`
  color: #444;
  font-size: 11.5px;
  font-weight: bold;
`;

export const OrderFooterAction = styled.View`
  padding: 20px;
  width: 33.3%;
  align-items: center;
  justify-content: flex-end;
`;

export const OrderDetailsText = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
`;

export const OrderStatus = styled.View`
  flex-direction: column;
  width: 100%;
`;

export const OrderStatusFlex = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 45px;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const OrderStatusLine = styled.View`
  width: 100%;
  position: absolute;
  margin-left: 45px;
  height: 1px;
  background-color: #7d40e7;
`;

export const OrderStatusIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #7d40e7;
  background-color: ${(props) => (props.active ? '#7d40e7' : '#fff')};
`;

export const OrderStatusTextFlex = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 28px;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const OrderStatusText = styled.Text`
  text-align: center;
  font-size: 8px;
  color: #999;
  width: 45px;
`;
