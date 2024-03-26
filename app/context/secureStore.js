import * as SecureStore from 'expo-secure-store';

export const onSignUp = async (formData) => {
    try{
        const jsonString = JSON.stringify(formData);
        await SecureStore.setItemAsync('formData' , jsonString);

    } catch(error) {
        console.log("failed to save" , error.message)
        return false
    } finally {
        return true
    }
}

export const onLogin = async (emailLog , passwordLog) => {
    try {
        let formData = await SecureStore.getItemAsync('formData');
        let storedData = JSON.parse(formData);
        let result = (storedData.email === emailLog && storedData.passwordLog === passwordLog);
        return result

    } catch (err) {
        console.log("failed to login" , err.message)
        return false
    }
}

export const getLoginInfo = async () => {
    try {
        let formData = await SecureStore.getItemAsync('formData');
        const storedData = JSON.parse(formData);
        return {
            email: storedData.email,
            firstName: storedData.firstName,
            lastName: storedData.lastName
        }
    } catch (err) {
        console.log("failed to getLoginInfo" , err.message)
        return false
    }
}

export const getFirstName = async () => {
    try {
        let formData = await SecureStore.getItemAsync('formData');
        const storedData = JSON.parse(formData);
        return storedData.firstName
    } catch (err) {
        console.log("failed to get the firstName" , err.message)
        return false
    }
}

// Fonction pour effacer toutes les données stockées
const deleteAllData = async () => {
    try {
        await SecureStore.deleteItemAsync("formData");
        console.log("Toutes les données ont été effacées avec succès.");
    } catch (error) {
        console.error("Erreur lors de la suppression des données :", error);
    }
};


