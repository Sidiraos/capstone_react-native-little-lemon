import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = React.useState('');

	return (
			<Searchbar
				placeholder="Search"
				onChangeText={setSearchQuery}
				value={searchQuery}
                theme={{ colors: { primary: '#F4CE14'  , elevation: {level3 : '#F2F3F4'}} }}
                mode='view'
                elevation={4}
                style={styles.boxStyle}
                inputStyle={styles.inputStyle}
			/>
	);
};

const styles = StyleSheet.create({
    boxStyle: {
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
    },
    inputStyle: {
        alignSelf: 'center',
    }
});

export default SearchBar;
