import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useFilteringData } from '../app/customHooks/useSQLite';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setQuery } from '../app/redux/slices/querySlice';
const SearchBar = () => {
	const query = useSelector((state) => state.query.query, shallowEqual);
	console.log('query in search bar :', query);

	const dispatch = useDispatch();
	const lookup = useCallback((text) => {
		dispatch(setQuery(text));
	}, []);

	// const debouncedLookup = useMemo(() => debounce(lookup, 100), [lookup]);

	const handleSearchChange = (text) => {
		// debouncedLookup(text);
		lookup(text);
	};

	return (
		<Searchbar
			placeholder="Search"
			onChangeText={(text) => handleSearchChange(text)}
			value={query}
			theme={{
				colors: {
					primary: '#F4CE14',
					elevation: { level3: '#F2F3F4' },
				},
			}}
			mode="view"
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
	},
});

export default SearchBar;
