import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import getSectionListData from '../../../utils/structuredData';
import { saveMenuItems } from '../../../database';

const initialState = {
	query: '',
};

const querySlice = createSlice({
	name: 'query',
	initialState,
	reducers: {
		setQuery(state, action) {
			state.query = action.payload;
		},
	},
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
