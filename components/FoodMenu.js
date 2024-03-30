import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	Image,
	SafeAreaView,
	ActivityIndicator,
    ScrollView,
    RefreshControl
} from 'react-native';
import {
	Karla_700Bold,
	Karla_400Regular,
	Karla_500Medium,
} from '@expo-google-fonts/karla';

import { useFonts } from 'expo-font';

import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { fetchingMenuData } from '../app/redux/slices/foodMenuSlice';

import {ErrorIcon} from '../utils/Icons';

const Item = ({ title, description, price, category, image }) => {
	console.log('item rendered', title, description, price, category, image);
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
					source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }}
					style={styles.image}
				/>
			</View>
		</View>
	);
};

const FoodMenu = () => {
    
	const { data, isLoading, errMsg } = useSelector(
		(state) => state.menu,
		shallowEqual
	);
	const dispatch = useDispatch();
	// console.log(data);
	// console.log(isLoading);
	// console.log(errMsg);

    const [refreshing, setRefreshing] = useState(false);

    const [fontsLoaded] = useFonts({
		Karla_700Bold,
		Karla_400Regular,
		Karla_500Medium,
	});
	if (!fontsLoaded) return null;

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(
            fetchingMenuData(
                'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
            )
        );
        setRefreshing(false);
    }

	useEffect(() => {
		console.log('use effect in food menu component');
		dispatch(
			fetchingMenuData(
				'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
			)
		);
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator size={'large'} color={'#F4CE14'} />
			) : errMsg ? (
				<Text>{errMsg}</Text>
			) : (
                data ? (
                    <FlatList
					data={data}
					renderItem={({ item }) => (
						<Item
							title={item.name}
							description={item.description}
							price={item.price}
							category={item.category}
							image={item.image}
						/>
					)}
					keyExtractor={(item) => item.id}
					style={styles.container}
					ItemSeparatorComponent={() => (
						<View style={styles.itemSeparatorStyle} />
					)}

                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				/>
                ) : (
                    <ScrollView style={[styles.container]} contentContainerStyle={{justifyContent : 'center', alignItems : 'center'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        <Text style={styles.textParagraph}>Something went wrong</Text>
                        <ErrorIcon />
                        <Text style={styles.textParagraph}>Slidedown to refresh</Text>
                    </ScrollView>
                )
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
