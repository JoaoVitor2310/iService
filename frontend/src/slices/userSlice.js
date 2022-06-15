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
    'user/profle', async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.profile(user, token);
        return data;
    }
)

export const updateProfile = createAsyncThunk(
    'user/update', async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.updateProfile(user, token);
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
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
        }).addCase(profile.fulfilled, (state, action) => { // If the profile API is fulfilled
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload; //User will come from action
        }).addCase(updateProfile.pending, state => { // If the updateProfile API is pending
            state.loading = true;
            state.error = false;
        }).addCase(updateProfile.fulfilled, (state, action) => { // If the updateProfile API is fulfilled
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload; //User will come from action
            state.message = 'Perfil atualizado!';
        }).addCase(updateProfile.rejected, (state, action) => { // If the updateProfile API is rejected
            state.loading = false;
            state.error = action.payload; //Error will come from action, and will show for user
            state.user = {};
        })
    }
})

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer; 