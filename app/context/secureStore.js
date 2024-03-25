import * as SecureStore from 'expo-secure-store';

export const onSignUp = async (email , password) => {
    try{
        await SecureStore.setItemAsync('email' , email);
        await SecureStore.setItemAsync('password' , password);

    } catch(error) {
        console.log("failed to save" , error.message)
        return false
    } finally {
        return true
    }
}

export const onLogin = async (email , password) => {
    try {
        // console.log(email , password)
        let emailLog = await SecureStore.getItemAsync('email');
        let passwordLog = await SecureStore.getItemAsync('password');
        // console.log("emailLog" , emailLog)
        // console.log("passwordLog" , passwordLog)
        let result = (emailLog === email && passwordLog === password);
        return result

    } catch (err) {
        console.log("failed to login" , err.message)
        return false
    }
}
