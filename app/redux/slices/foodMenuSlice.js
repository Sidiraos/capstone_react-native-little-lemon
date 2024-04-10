import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import getSectionListData from '../../../utils/structuredData';
import { saveMenuItems } from '../../../database';
import filterDataByQuery from '../../../utils/queryFilteredData';
import destructuredData from '../../../utils/destructureData';

const initialState = {
	data: [],
	isLoading: true,
	error: null,
	dataStructured: [],
	categoriesList: [],
	selectedCategories: [],
	dataFiltered: [],
};

const foodMenuSlice = createSlice({
	name: 'foodMenu',
	initialState,
	reducers: {
		onRejected: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		onFulfilled: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
			state.error = null;
			state.categoriesList = getSectionListData(state.data).map(
				(item) => {
					return {
						title: item.title,
						id: uuid.v4(),
						selected: false,
					};
				}
			);
		},
		toggle: (state, action) => {
			state.categoriesList = state.categoriesList.map((item) => {
				if (item.id === action.payload) {
					return {
						...item,
						selected: !item.selected,
					};
				}
				return item;
			});
		},

		getStructuredData: (state, action) => {
			state.dataStructured = getSectionListData(action.payload);
            state.dataFiltered = state.dataStructured
		},
		setFilteredData(state , action) {
			if(!action.payload.newData){
				if(!action.payload.query){
					state.dataFiltered = state.dataStructured.filter(item => {
						return state.selectedCategories.some(category => category === item.title)})
				} else {
					state.dataFiltered = state.dataStructured.filter(item => {
						return state.selectedCategories.some(category => category === item.title)})
					const destructured = destructuredData(state.dataFiltered)
					// console.log("destructured" , destructured)
					const filteredByQuery = filterDataByQuery(destructured , action.payload.query)
					// console.log("filteredByQuery" , filteredByQuery)
					state.dataFiltered = getSectionListData(filteredByQuery)
				}
			}
			else {state.dataFiltered = action.newData}

		},
		setSelectedCategories(state, action) {
			state.selectedCategories = action.payload;
		},
	},
});

export const fetchingMenuData = (url) => {
	return async (dispatch) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			const newData = data.menu.map((item) => {
				return { ...item, id: uuid.v4() };
			});
			dispatch(onFulfilled(newData)); // Retourner uniquement le menu
			dispatch(getStructuredData(newData));
			await saveMenuItems(newData);
		} catch (error) {
			console.error('Error fetching data on fetchingMenuData:', error);
			dispatch(onRejected(error.message)); // Lancer une erreur en cas d'échec de la requête
		}
	};
};

export const filteringDataFromState =  (categories , query) => {
    return (dispatch , getState)=>{
        state = getState().menu
        if(categories.length){
			dispatch(setSelectedCategories(categories))
			dispatch(setFilteredData({query : query}))

		}else {
			dispatch(setSelectedCategories(state.categoriesList.map((item) => item.title)))
			dispatch(setFilteredData({query : query}))
		}
    }
}

export const {
	onRejected,
	onFulfilled,
	toggle,
	getStructuredData,
	setFilteredData,
	setSelectedCategories,
} = foodMenuSlice.actions;
export default foodMenuSlice.reducer;
