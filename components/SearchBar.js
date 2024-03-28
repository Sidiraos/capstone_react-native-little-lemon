import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = React.useState('');

	return (
		<View style={styles.container}>
			<Searchbar
				placeholder="Search"
				onChangeText={setSearchQuery}
				value={searchQuery}
                theme={{ colors: { primary: '#F4CE14'  , elevation: {level3 : '#F2F3F4'}} }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,  }
});

export default SearchBar;
