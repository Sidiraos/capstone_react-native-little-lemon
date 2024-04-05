import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Text,
} from 'react-native';
import { Karla_800ExtraBold, useFonts } from '@expo-google-fonts/karla';
import { toggle } from '../app/redux/slices/foodMenuSlice';
import { useSelector, shallowEqual , useDispatch } from 'react-redux';

const DATA_SAMPLE = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Category 1',
		selected : false,
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Category 2',
		selected : false,

	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Category 3',
		selected : false,
	},
];

const Item = ({ title, color, backgroundColor, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[styles.itemButton, { backgroundColor: backgroundColor }]}
	>
		<Text style={[styles.title, { color: color }]}>
			{title.toUpperCase()}
		</Text>
	</TouchableOpacity>
);

const ListOfCategories = () => {
	const dispatch = useDispatch();

	const categoriesList = useSelector(
		(state) => state.menu.categoriesList,
		shallowEqual
	);

	// console.log('categoriesList : ' , categoriesList)
	const [fontsLoaded] = useFonts({
		Karla_800ExtraBold,
	});
	if (!fontsLoaded) return null;

	const handlePressBtn = (id) => {
		dispatch(toggle(id));		
	};

	const renderItem = ({ item }) => {
		const backgroundColor = item.selected ? '#EE9972' : '#D9D9D9';
		const textColor = item.selected ? 'white' : '#333';
		return (
			<Item
				title={item.title}
				onPress={() => handlePressBtn(item.id)}
				backgroundColor={backgroundColor}
				color={textColor}
				
			/>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={categoriesList}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	itemButton: {
		flex: 1,
		padding: 10,
		marginVertical: 8,
		marginRight: 10,
		borderRadius: 25,
	},
	title: {
		fontSize: 10,
		fontFamily: 'Karla_800ExtraBold',
	},
	container: {
		flex: 1,
	},
});

export default React.memo(ListOfCategories);
