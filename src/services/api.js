import axios from 'axios';
import { Platform } from 'react-native';

// Set API_URL_GENYMONTION to null to default to the machine's IP address
// Genymotion: http://10.0.3.2:3333
const API_URL_GENYMONTION = 'http://10.0.3.2:3333';
// Machine's IP: http://192.168.0.6:3333
const API_USB = 'http://192.168.0.103:3333';
// iOS Simulator: http://localhost:3333
const API_URL_IOS = 'http://localhost:3333';
// --------------------------------------------------
// Checks whether to use the user's IP address (real device test) or Genymotion's IP (simulator)
const API_URL_ANDROID = API_URL_GENYMONTION || API_USB;

export const BASE_URL = Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
