import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

export const profile = createAsyncThunk(
    'user/profle', async(user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.profile(user, token);
        return data;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetMessage: state => {
            state.message = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(profile.pending, state => { // If the profile API is pending
            state.loading = true;
            state.error = false;
        })
        .addCase(profile.fulfilled, (state, action) => { // If the profile API is fulfilled
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload; //User will come from action
        })
    }
})

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer; 