import { Platform } from 'react-native';
import { BASE_URL } from '~/services/api';

export default function parseUploadImage(imageObj) {
  const { url, path } = imageObj;

  return Platform.OS === 'ios' ? url : `${BASE_URL}/files/${path}`;
}
