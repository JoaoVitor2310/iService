import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import photoService from '../services/photoService';

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

export const publishPhoto = createAsyncThunk(
    'photo/publish', async (photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.publishPhoto(photo, token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

export const getUserPhotos = createAsyncThunk(
    'photo/userphotos',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.getUserPhotos(id, token);
        return data;
    }
)

export const deletePhoto = createAsyncThunk(
    'photo/delete',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.deletePhoto(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
)

export const updatePhoto = createAsyncThunk(
    'photo/update',
    async (photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.updatePhoto({ title: photoData.title }, photoData.id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

export const getPhoto = createAsyncThunk(
    'user/getphoto',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.getPhoto(id, token);
        return data;
    }
)

export const like = createAsyncThunk(
    'photo/like',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.like(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

export const comment = createAsyncThunk(
    'photo/comment',
    async(commentData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.comment({comment: commentData.comment}, commentData.id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

export const getPhotos = createAsyncThunk(
    'photo/getall',
    async(_, thunkAPI) => { // Esse underline é pq o primeiro argumento é desnecessário.
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.getPhotos(token);
        return data;
    }
)

//photoSlice, action.payload will be the response from backend
export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetMessage: state => {
            state.message = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(publishPhoto.pending, (state) => { // If the publishPhoto is pending
            state.loading = true;
            state.error = false;
        }).addCase(publishPhoto.fulfilled, (state, action) => { // If the publishPhoto is fulfilled, updates user
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload; // Photo will come from action.payload
            state.photos.unshift(state.photo); // Inserts payload on state.photo array, like the push, but instead of being at the end, it will be at the beginning. 
            state.message = 'Foto publicada com sucesso!';
        }).addCase(publishPhoto.rejected, (state, action) => { //If the publishPhoto is rejected
            state.loading = false;
            state.error = action.payload; //Error message will come from payload
            state.photo = {}; //Same as null
        }).addCase(getUserPhotos.pending, (state) => { // If the getUserPhotos is pending
            state.loading = true;
            state.error = false;
        }).addCase(getUserPhotos.fulfilled, (state, action) => { // If the getUserPhotos is fulfilled, updates user
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        }).addCase(deletePhoto.pending, (state) => { 
            state.loading = true;
            state.error = false;
        }).addCase(deletePhoto.fulfilled, (state, action) => { 
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = state.photos.filter(photo => { return photo._id !== action.payload.id }) // Filters the photo with same id as payload
            state.message = action.payload.message;
        }).addCase(deletePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; //Error message will come from payload to be shown to the user
            state.photo = {}; //Same as null
        }).addCase(updatePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updatePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos.map(photo => { // Updates the photo on the state
                if (photo._id === action.payload.photo._id) {
                    return photo.title = action.payload.photo.title;
                }
                return photo;
            });

            state.message = action.payload.message;
        }).addCase(updatePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; //Error message will come from payload to be shown to the user
            state.photo = {}; //Same as null
        }).addCase(getPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
        }).addCase(like.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            if (state.photo.likes) {
                state.photo.likes.push(action.payload.userId);//Push userId on photo.likes at the photo page
            }

            state.photos.map(photo => { //Push userId on photo.likes at the home page
                if (photo._id === action.payload.photoId) {
                    return photo.likes.push(action.payload.userId);
                }
                return photo;
            });

            state.message = action.payload.message;
        }).addCase(like.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(comment.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(comment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo.comments.push(action.payload.comment);
            state.message = action.payload.message;
        }).addCase(comment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
    }
})


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;