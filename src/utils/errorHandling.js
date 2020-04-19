import { Alert } from 'react-native';

export default function errorHandling(err) {
  if (err.response) {
    Alert.alert('Something went wrong', err.response.data.error);
  } else {
    Alert.alert(err.message, "Make sure you're connected to the internet.");
  }
}
