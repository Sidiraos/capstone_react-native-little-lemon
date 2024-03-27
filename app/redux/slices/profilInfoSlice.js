import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  image: null,
  emailNotifications :  [
    {label: 'Order statues' , value: 'checked' , id : 1},
    {label: 'Special offers' , value: 'unchecked' , id : 2},
    {label: 'Newsletter' , value: 'unchecked' , id : 3},
    {label: 'Password changes' , value: 'checked' , id : 4},
]
}

export const profilInfoSlice = createSlice({
  name: 'profilInfo',
  initialState,
  reducers: {
    changeImage: (state, action) => {
        
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeImage } = profilInfoSlice.actions

export default profilInfoSlice.reducer
