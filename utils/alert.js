import { Alert } from 'react-native';

export const showAlert = (alertTitle , alertMsg  , callBack) =>
  Alert.alert(
    alertTitle,
    alertMsg,
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('canceled'),
        style: 'cancel',
      },
      { text: 'OK', onPress: callBack },
    ],
  );