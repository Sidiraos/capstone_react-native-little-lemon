import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Karla_500Medium, useFonts } from '@expo-google-fonts/karla';
import { Checkbox } from 'react-native-paper';

import {useSelector , useDispatch} from 'react-redux';
import { toggle } from '../app/redux/slices/profilInfoSlice';

const EmailNotifications = () => {
	console.log("email notifications")
    const state = useSelector((state) => state.profilInfo.myNotifications);
    const dispatch = useDispatch();

	let [loadedFonts] = useFonts({
		Karla_500Medium,
	});
	if (!loadedFonts) {
		return null;
	}


    const handleCheckBoxPress = (id) => {
        console.log("checkbox pressed");
        dispatch(toggle(id));
    }
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Email notifications</Text>
            {
                state.map((label) => {
                    return <Checkbox.Item label={label.label} onPress={() => handleCheckBoxPress(label.id)} labelStyle={{fontFamily: 'Karla_500Medium'}} status={label.value} color='#495E57' key={label.id}/>
                })
            }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		marginVertical: 20,
	},
	headerText: {
		fontFamily: 'Karla_500Medium',
		fontSize: 20,
	},
});

export default React.memo(EmailNotifications);
