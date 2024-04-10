import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	Image,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
} from 'react-native';
import {
	Karla_700Bold,
	Karla_400Regular,
	Karla_500Medium,
} from '@expo-google-fonts/karla';

import { useFonts } from 'expo-font';

import { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { fetchingMenuData , onFulfilled , setFilteredData , getStructuredData , setSelectedCategories , filteringDataFromState } from '../app/redux/slices/foodMenuSlice';

import { ErrorIcon } from '../utils/Icons';

import { getMenuItems , createTable, filterByQueryAndCategories } from '../database';
import { useUpdateEffect
 } from '../database';

const Item = ({ title, description, price, image }) => {
	const [fontsLoaded] = useFonts({
		Karla_700Bold,
		Karla_400Regular,
		Karla_500Medium,
	});
	if (!fontsLoaded) return null;
	return (
		<View style={styles.itemCard}>
			<Text style={styles.cardTitle}>{title}</Text>
			<View style={styles.sectionCard}>
				<View style={styles.sectionCardTextGroup}>
					<Text style={styles.textParagraph} numberOfLines={2}>
						{description}
					</Text>
					<Text style={styles.highlight}>${price}</Text>
				</View>
				<Image
					source={{
						uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
					}}
					style={styles.image}
				/>
			</View>
		</View>
	);
};

const FoodMenu = () => {
	const { isLoading, errMsg , categoriesList , selectedCategories , dataFiltered} = useSelector(
		(state) => state.menu,
		shallowEqual
	);
	const {query} = useSelector((state) => state.query, shallowEqual);
	const dispatch = useDispatch();

	console.dir("dataFiltered" , dataFiltered)

	const dataToDisplay = [];
	useEffect(() => {
		dataFiltered.forEach((categoryObj) => {
			categoryObj.data.forEach((item) => {
				dataToDisplay.push(item);
			});
		});
		
	}  , [dataFiltered]);


	useEffect(()=>{
		const fetchingFoodMenu = async ()=>{
			await createTable()
			const menuItems = await getMenuItems()
			console.log("menu items in database on loading"  , menuItems)
			if(!menuItems.length){
				dispatch(fetchingMenuData('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'))
			} else {
				dispatch(onFulfilled(menuItems))
				dispatch(getStructuredData(menuItems));
			}
		}

		fetchingFoodMenu();

	} , [])

	
	useUpdateEffect(()=>{
		const categories = categoriesList.filter((item) => item.selected === true).map((item) => item.title);
		(async()=> 
		{
			await createTable()
			const menuItems = await getMenuItems()
			if(!menuItems.length){
				dispatch(filteringDataFromState(categories , query))
				
			} else {
				const newData = await filterByQueryAndCategories(query , selectedCategories)
				dispatch(setFilteredData({newdata : newData}))
			}

		})()		
		
	} , [categoriesList , query])


	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		dispatch(
			fetchingMenuData(
				'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
			)
		);
		setRefreshing(false);
	};

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator size={'large'} color={'#F4CE14'} />
			) : errMsg ? (
				<Text>{errMsg}</Text>
			) : dataToDisplay ? (
				<FlatList
					data={dataToDisplay}
					renderItem={({ item }) => (
						<Item
							title={item.name}
							description={item.description}
							price={item.price}
							image={item.image}
						/>
					)}
					keyExtractor={(item) => item.id}
					style={styles.container}
					ItemSeparatorComponent={() => (
						<View style={styles.itemSeparatorStyle} />
					)}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				/>
			) : (
				<ScrollView
					style={[styles.container]}
					contentContainerStyle={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					<Text style={styles.textParagraph}>
						Something went wrong
					</Text>
					<ErrorIcon />
					<Text style={styles.textParagraph}>
						Slidedown to refresh
					</Text>
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		// marginVertical: 10,
		backgroundColor: '#fff',
	},
	itemCard: {
		gap: 10,
	},
	sectionCard: {
		flexDirection: 'row',
		gap: 1,
	},
	sectionCardTextGroup: {
		flex: 0.6,
		gap: 3,
	},
	cardTitle: {
		fontFamily: 'Karla_700Bold',
		color: '#333',
		fontSize: 18,
	},
	textParagraph: {
		fontFamily: 'Karla_400Regular',
		color: '#495E57',
		fontSize: 16,
		lineHeight: 22,
	},
	highlight: {
		fontFamily: 'Karla_500Medium',
		color: '#495E57',
		fontSize: 16,
	},
	image: {
		width: 80,
		height: 80,
		resizeMode: 'cover',
		flex: 0.4,
	},
	itemSeparatorStyle: {
		height: 1,
		backgroundColor: 'rgba(0,0,0,0.2)',
		width: '100%',
		marginVertical: 20,
	},
});

export default FoodMenu;
