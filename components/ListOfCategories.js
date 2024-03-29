import React , {useState} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Karla_800ExtraBold, useFonts } from '@expo-google-fonts/karla';

const Item = ({ title , color , backgroundColor , onPress }) => (
	<TouchableOpacity onPress={onPress} style={[styles.itemButton , {backgroundColor : backgroundColor}]}>
		<Text style={[styles.title , {color : color}]}>{title}</Text>
	</TouchableOpacity>
);

const ListOfCategories = () => {
	const [selectedId, setSelectedId] = useState(null);

	const [fontsLoaded] = useFonts({
		Karla_800ExtraBold,
	});
	if (!fontsLoaded) return null;

	const DATA = [
		{
			id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
			title: 'First Item',
		},
		{
			id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
			title: 'Second Item',
		},
		{
			id: '58694a0f-3da1-471f-bd96-145571e29d72',
			title: 'Third Item',
		},
	];

	const renderItem = ({ item }) => {
		const backgroundColor = item.id === selectedId ? '#EE9972' : '#D9D9D9';
		const textColor = item.id === selectedId ? 'white' : '#333';
		return (
			<Item title={item.title} onPress={() => setSelectedId(item.id)} backgroundColor={backgroundColor} color={textColor}/>
		)
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
                horizontal
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	itemButton: {
		// backgroundColor: '#D9D9D9',
		padding: 10,
		marginVertical: 8,
		marginRight: 10,
		borderRadius: 25,
	},
	title: {
		fontSize: 10,
		fontFamily: 'Karla_800ExtraBold',
	},
    container : {
		flex : 1,
    }
});

export default ListOfCategories;
