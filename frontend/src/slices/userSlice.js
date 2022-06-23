import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    users: [],
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

export const getUserDetails = createAsyncThunk(
    'user/get', async(id, thunkAPI) => {
        const data = await userService.getUserDetails(id);
        return data;
    }
)

export const followUser = createAsyncThunk(
    'user/follow',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.followUser(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

export const searchUsers = createAsyncThunk(
    'user/search',
    async(query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.searchUsers(query, token);
        return data;
    }
)

export const searchUsersByOccupation = createAsyncThunk(
    'user/searchByOccupation',
    async(query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.searchUsersByOccupation(query, token);
        return data;
    }
)

//userSlice, action.payload will be the response from backend
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
        }).addCase(getUserDetails.pending, state => { // If the getUserDetails API is pending
            state.loading = true;
            state.error = false;
        }).addCase(getUserDetails.fulfilled, (state, action) => { // If the getUserDetails API is fulfilled
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload; //User will come from action
        }).addCase(followUser.pending, (state) => { // Caso o fetch do followUser estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(followUser.fulfilled, (state, action) => { // Caso o fetch do followUser estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
            state.user = action.payload.user;
            
            if(!state.user.followers.includes(action.payload.userFollowing._id)){
                state.user.followers.push(action.payload.userFollowing._id);
            }else{
                state.user.followers = state.user.followers.filter(follower => {return follower !== action.payload.userFollowing._id});
            }
        }).addCase(followUser.rejected, (state, action) => { // Caso o fetch do followUser tiver sido rejeitado.
            state.loading = false;
            state.error = action.payload; // A mensagem de erro virá no payload e poderá ser exibida pro usuário
        }).addCase(searchUsers.pending, (state) => { // Caso o fetch do searchUsers estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(searchUsers.fulfilled, (state, action) => { // Caso o fetch do searchUsers estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.users = action.payload;
        }).addCase(searchUsersByOccupation.pending, (state) => { // Caso o fetch do searchUsersByOccupation estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(searchUsersByOccupation.fulfilled, (state, action) => { // Caso o fetch do searchUsersByOccupation estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.users = action.payload;
        })
    }
})

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer; 