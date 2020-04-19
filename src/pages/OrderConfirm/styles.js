import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TakePictureButton = styled.TouchableOpacity`
  background: transparent;
  position: absolute;
  align-items: center;
  justify-content: flex-end;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  justify-content: center;
  background: #7159c1;
  left: 50%;
  margin-left: -35px;
  bottom: ${Platform.OS === 'ios' ? '25px' : '0px'};
`;

export const CameraContainer = styled.View`
  border-radius: 4px;
  margin-top: ${Platform.OS === 'ios' ? '0px' : '64px'};
  background: #fff;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
  position: relative;
`;

export const SignatureCamera = styled(RNCamera)`
  height: ${Platform.OS === 'ios' ? '400px' : '300px'};
`;

export const PreviewSignature = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;
