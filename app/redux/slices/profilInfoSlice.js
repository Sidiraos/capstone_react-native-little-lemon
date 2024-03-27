import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
	image: null,
	myNotifications: [
		{ label: 'Order statues', value: 'checked', id: 1 },
		{ label: 'Special offers', value: 'unchecked', id: 2 },
		{ label: 'Newsletter', value: 'unchecked', id: 3 },
		{ label: 'Password changes', value: 'checked', id: 4 },
	],
};

export const profilInfoSlice = createSlice({
	name: 'profilInfo',
	initialState,
	reducers: {
		changeImage: (state, action) => {
			state.image = action.payload;
		},
		removeImage: (state) => {
			state.image = null;
		},
		toggle: (state, action) => {
			state.myNotifications = state.myNotifications.map((item) => {
				if (item.id === action.payload) {
					return {
						...item,
						value:
							item.value === 'checked' ? 'unchecked' : 'checked',
					};
				}
				return item;
			});
		},
		updateStateFromAsync: (state, action) => {
			state.image = action.payload.image;
            state.myNotifications = action.payload.myNotifications;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	changeImage,
	removeImage,
	toggle,
	updateStateFromAsync,
    
} = profilInfoSlice.actions;

export default profilInfoSlice.reducer;
