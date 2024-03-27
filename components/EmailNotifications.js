import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Karla_500Medium, useFonts } from '@expo-google-fonts/karla';
import { Checkbox } from 'react-native-paper';
import { useState , useReducer } from 'react';

const EmailNotifications = () => {
    const initialState = [
        {label: 'Order statues' , value: 'checked' , id : 1},
        {label: 'Special offers' , value: 'checked' , id : 2},
        {label: 'Newsletter' , value: 'unchecked' , id : 3},
        {label: 'Password changes' , value: 'checked' , id : 4},
    ]
    const reducer = (state , action)=>{
        switch(action.type){
            case 'toggle' :
                return state.map((item)=>{
                    if(item.id === action.id){
                        return {...item , value : item.value === 'checked' ? 'unchecked' : 'checked'}
                    }
                    return item
                })
            default :
                return initialState
    }}

    const [state, dispatch] = useReducer(reducer, initialState);


	let [loadedFonts] = useFonts({
		Karla_500Medium,
	});
	if (!loadedFonts) {
		return null;
	}


    const handleCheckBoxPress = (id) => {
        console.log("checkbox pressed");
        dispatch({type : 'toggle' , id})
    }
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Email notifications</Text>
            {
                state.map((label) => {
                    return <Checkbox.Item label={label.label} onPress={() => handleCheckBoxPress(label.id)} labelStyle={{fontFamily: 'Karla_500Medium'}} status={label.value} color='#4F4F4F' key={label.id}/>
                })
            }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
	},
	headerText: {
		fontFamily: 'Karla_500Medium',
		fontSize: 20,
	},
});

export default EmailNotifications;
