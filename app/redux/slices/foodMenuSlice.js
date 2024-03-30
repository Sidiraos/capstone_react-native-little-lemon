import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';


const initialState = {
    data: [],
    isLoading: true,
    error: null,
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
        }

    }
});



export const fetchingMenuData =  (url)=>{
    console.log("action", url);
    return async (dispatch) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const newData = data.menu.map(item => {
                return { ...item, id: uuid.v4() };
                
            })
            // console.log("data", newData);
            dispatch(onFulfilled(newData)); // Retourner uniquement le menu
        } catch (error) {
            console.error("Error fetching data:", error);
            dispatch(onRejected(error.message)); // Lancer une erreur en cas d'échec de la requête
        }
    };
}


export const {onRejected, onFulfilled } = foodMenuSlice.actions;
export default foodMenuSlice.reducer;
