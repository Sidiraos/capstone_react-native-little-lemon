import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import HeaderHomeTitleBar from '../components/HeaderHomeTitleBar';
import AvatarEdit from '../components/AvatarEdit';
import PersonnalInfo from '../components/PersonnalInfo';
import EmailNotifications from '../components/EmailNotifications';
import LogOut from '../components/LogOut';

import { useState } from 'react';

import { useRoute } from '@react-navigation/native';

const ProfileScreen = () => {
	const route = useRoute();
	const screenName = route.name;

	const [image, setImage] = useState(null);

	return (
		<ScrollView keyboardDismissMode="on-drag" style={styles.container}>
			<HeaderHome image={image}/>
			<HeaderHomeTitleBar headerTitle={screenName} />
			<AvatarEdit image={image} setImage={setImage}/>
			<PersonnalInfo />
			<EmailNotifications />
			<LogOut />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingBottom: 20,
	},
});

export default React.memo(ProfileScreen);
