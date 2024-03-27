import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import HeaderHomeTitleBar from '../components/HeaderHomeTitleBar';
import AvatarEdit from '../components/AvatarEdit';
import PersonnalInfo from '../components/PersonnalInfo';
import EmailNotifications from '../components/EmailNotifications';
import LogOut from '../components/LogOut';
import SaveDiscard from '../components/SaveDiscard';

import { useEffect , useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {useSelector , useDispatch , shallowEqual} from 'react-redux';
import { storeObjectData , getObjectData } from '../app/context/asyncStorageData';
import { updateStateFromAsync  } from '../app/redux/slices/profilInfoSlice';

import _ from 'lodash';

const ProfileScreen = () => {
	const route = useRoute();
	const screenName = route.name;
	const profilInfoState = useSelector(state => state.profilInfo , shallowEqual);
	const dispatch = useDispatch();
	console.log("state changed on profilescreen ")
	console.log("profil state after dispatch ", profilInfoState)

	const [noChanged , setNoChanged] = useState(true);

	useEffect(() => {
		console.log("use effect is changing state");
		const fetchingStorage = async ()=>{
			console.log("fetching storage");
			const profilInfo = await getObjectData('profilInfo');
			if (profilInfo){
				const isEqual = _.isEqual(profilInfoState , profilInfo);
				if(!isEqual){
					setNoChanged(false);
				} else {
					setNoChanged(true);
				}
			}
		}
		fetchingStorage();
	} , [profilInfoState]);

	console.log("no changed value is"  , noChanged)

	useEffect(() => {
		console.log("use effect on profile screen")
		const fetchingProfilInfo = async () => {
			const profilInfo = await getObjectData('profilInfo');
			if(profilInfo){
				console.log("profil info found , we update state from async storage")
				// console.log("profil info in async is" , profilInfo)
				dispatch(updateStateFromAsync(profilInfo))
			}else {
				console.log("no profil info found , we save initial state in async storage")
				storeObjectData('profilInfo', profilInfoState);
			}
		}
		fetchingProfilInfo()
	} , [])


	

	return (
		<>
			<HeaderHome noChanged = {noChanged} />
			<ScrollView keyboardDismissMode="on-drag" style={styles.container}>
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
