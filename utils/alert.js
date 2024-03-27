import { Alert } from 'react-native';

export const showAlert = (alertTitle , alertMsg  , saveToStorage) =>
  Alert.alert(
    alertTitle,
    alertMsg,
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('canceled'),
        style: 'cancel',
      },
      { text: 'OK', onPress: saveToStorage },
    ],
  );