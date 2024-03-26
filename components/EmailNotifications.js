import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Karla_500Medium, useFonts } from '@expo-google-fonts/karla';
import { Checkbox } from 'react-native-paper';
import { useState } from 'react';

const EmailNotifications = () => {
    const [status , setStatus] = useState('unchecked');
    const [labels , setLabels] = useState([
        {label: 'Order statues' , value: 'checked'},
        {label: 'Special offers' , value: 'checked'},
        {label: 'Newsletter' , value: 'unchecked'},
        {label: 'Password changes' , value: 'checked'},
    ])


	let [loadedFonts] = useFonts({
		Karla_500Medium,
	});
	if (!loadedFonts) {
		return null;
	}


    const handleCheckBoxPress = () => {
        if(status === 'checked'){
            setStatus('unchecked');
        }else{
            setStatus('checked');
        }
    }

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Email notifications</Text>
            {
                labels.map((label , index) => {
                    return <Checkbox.Item label={label.label} labelStyle={{fontFamily: 'Karla_500Medium'}} status={label.value} color='#4F4F4F' key={index}/>
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
