import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import HeaderHomeTitleBar from '../components/HeaderHomeTitleBar';
import AvatarEdit from '../components/AvatarEdit';
import PersonnalInfo from '../components/PersonnalInfo';
import EmailNotifications from '../components/EmailNotifications';
import LogOut from '../components/LogOut';
import SaveDiscard from '../components/SaveDiscard';

import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import useGetProfilInfo  from '../app/customHooks/useGetProfilInfo';
import useCheckProfilInfoState from '../app/customHooks/useCheckProfilInfoState';
import _ from 'lodash';

const ProfileScreen = () => {

	const route = useRoute();
	const screenName = route.name;
	// console.log("state changed on profilescreen ")

	const [noChanged , setNoChanged] = useState(true);

	useCheckProfilInfoState(setNoChanged);
	useGetProfilInfo();
	
	// console.log("no changed value is"  , noChanged)
	

	return (
		<>
			<ScrollView  stickyHeaderIndices={[0]} keyboardDismissMode="on-drag" style={styles.container}>
				<HeaderHome btnComponent = {<BackButton noChanged = {noChanged} />}/>
				<HeaderHomeTitleBar headerTitle={screenName} />
				<AvatarEdit />
				<PersonnalInfo />
				<EmailNotifications />
				<LogOut />
				<SaveDiscard noChanging = {noChanged} setNoChanged = {setNoChanged} />
			</ScrollView>
		</>
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
