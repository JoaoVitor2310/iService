import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import occupationService from '../services/occupationService';

const initialState = {
    occupations: [],
    occupation: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

export const getAllOccupations = createAsyncThunk(
    'occupations/getall',
    async(_, thunkAPI) => { //Underline because the first parameter is unecessary
        const token = thunkAPI.getState().auth.user.token; //Gets the token from auth state
        const data = await occupationService.getAllOccupations(token); //Calls the service
        return data;
    }
)

//occupationSlice, action.payload will be the response from backend
export const occupationSlice = createSlice({
    name: 'occupation', // Name that will be called at the store.js with useSelector
    initialState,
    reducers: {
        resetMessage: state => { //Resets the message before sending a new one
            state.message = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllOccupations.pending, (state) => { // If the getAllOccupations API is pending
            state.loading = true;
            state.error = false;
        }).addCase(getAllOccupations.fulfilled, (state, action) => { // If the getAllOccupations API is fulfilled
            state.loading = false;
            state.success = true;
            state.error = null;
            state.occupations = action.payload;
        })
    }
})

export const { resetMessage } = occupationSlice.actions;
export default occupationSlice.reducer;