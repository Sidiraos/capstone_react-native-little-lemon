import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import getSectionListData from '../../../utils/structuredData';
import { saveMenuItems } from '../../../database';

const initialState = {
	data: [],
	isLoading: true,
	error: null,
	dataStructured: [],
	categoriesList: [],
	query: '',
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
		setQuery(state, action) {
			state.query = action.payload;
		},
		setFilteredData(state) {
            state.dataFiltered = state.dataStructured.filter(item => {
                return state.selectedCategories.some(category => category === item.title)})
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
			saveMenuItems(newData);
		} catch (error) {
			console.error('Error fetching data:', error);
			dispatch(onRejected(error.message)); // Lancer une erreur en cas d'échec de la requête
		}
	};
};

export const filteringDataFromState =  (categories) => {
    return (dispatch , getState)=>{
        state = getState().menu
        if(categories.length){
			dispatch(setSelectedCategories(categories))
			dispatch(setFilteredData())

		}else {
			dispatch(setSelectedCategories(state.categoriesList.map((item) => item.title)))
			dispatch(setFilteredData())
		}
    }
}

export const {
	onRejected,
	onFulfilled,
	toggle,
	getStructuredData,
	setQuery,
	setFilteredData,
	setSelectedCategories,
} = foodMenuSlice.actions;
export default foodMenuSlice.reducer;
