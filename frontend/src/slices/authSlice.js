// Handles with the functions and, furthermore, creates a reset dispatch
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authservice';

const user = JSON.parse(localStorage.getItem('user')); // If the user is logged in, get it from localstorage
const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
};

export const register = createAsyncThunk( // Async function that will search an user and return him or an error
    'auth/register', async (user, thunkAPI) => {
        const data = await authService.register(user); // Sends the user for authService register use fetch
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]); // Returns the first errors to shows to the user
        }
        return data;
    }
)

export const logout = createAsyncThunk(
    'auth/logout', async () => {
        await authService.logout();
    }
)

export const authSlice = createSlice({
    name: 'auth', // Name that will be called at the store.js with useSelector
    initialState,
    reducers: {
        reset: state => { // Reset reducer to clean the states
            state.error = false;
            state.loading = false;
            state.success = false;
        },
    },
    extraReducers: builder => { // Part of the API executions
        builder.addCase(register.pending, state => { // If the register API is pending
            state.loading = true;
            state.error = false;
        })
        .addCase(register.fulfilled, (state, action) => { // If the register API is fulfilled
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload; //User will come from action
        })
        .addCase(register.rejected, (state, action) => { // If the register API is rejected
            state.loading = false;
            state.error = action.payload; //Error will come from action, and will show for user
            state.user = null;
        })
        .addCase(logout.fulfilled, (state, action) => { // If the register API is fulfilled
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;