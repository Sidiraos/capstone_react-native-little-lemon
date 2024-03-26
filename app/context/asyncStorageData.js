import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key , value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
      console.log("async Save successfully with the value" , value);
    } catch (e) {
      // saving error
      console.log("error saving data" , e);
    }
  };

 export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        // value previously stored
        console.log("value previously stored" , value);
        return value
      } else {
        // value not found
        console.log("value not found" , value);
        return null
      }
    } catch (e) {
      // error reading value
      console.log("error reading value" , e);
    }
  };

  export const clearAsyncData = async () => {
    await AsyncStorage.clear();
  }

  export const deleteData = async (key) => {
    await AsyncStorage.removeItem(key);
  }
