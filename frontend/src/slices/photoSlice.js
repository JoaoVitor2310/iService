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

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetMessage: state => {
            state.message = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(publishPhoto.pending, (state) => { // Caso o fetch do publishPhoto estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(publishPhoto.fulfilled, (state, action) => { // Caso o fetch do publishPhoto estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload; // A photo virá da action
            state.photos.unshift(state.photo); // Insete o state.photo no array de photos, tipo o push, mas ao invés de ser no final, será no início.
            state.message = 'Foto publicada com sucesso!';
        }).addCase(publishPhoto.rejected, (state, action) => { // Caso o fetch do publishPhoto tiver sido rejeitado.
            state.loading = false;
            state.error = action.payload; // A mensagem de erro virá no payload e poderá ser exibida pro usuário
            state.photo = {}; //Msm coisa de null, ta assim pra n dar erro
        }).addCase(getUserPhotos.pending, (state) => { // Caso o fetch do getUserPhotos estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(getUserPhotos.fulfilled, (state, action) => { // Caso o fetch do getUserPhotos estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        }).addCase(deletePhoto.pending, (state) => { // Caso o fetch do deletePhoto estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(deletePhoto.fulfilled, (state, action) => { // Caso o fetch do deletePhoto estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = state.photos.filter(photo => { return photo._id !== action.payload.id }) // Filtra a foto que tem o id igual ao do payload(foto que quer deletar)
            state.message = action.payload.message;
        }).addCase(deletePhoto.rejected, (state, action) => { // Caso o fetch do deletePhoto tiver sido rejeitado.
            state.loading = false;
            state.error = action.payload; // A mensagem de erro virá no payload e poderá ser exibida pro usuário
            state.photo = {}; //Msm coisa de null, ta assim pra n dar erro
        }).addCase(updatePhoto.pending, (state) => { // Caso o fetch do updatePhoto estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(updatePhoto.fulfilled, (state, action) => { // Caso o fetch do updatePhoto estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos.map(photo => { // Atualiza a foto no frontend, pra não ter que fazer uma nova requisição  
                if (photo._id === action.payload.photo._id) {
                    return photo.title = action.payload.photo.title;
                }
                return photo;
            });

            state.message = action.payload.message;
        }).addCase(updatePhoto.rejected, (state, action) => { // Caso o fetch do updatePhoto tiver sido rejeitado.
            state.loading = false;
            state.error = action.payload; // A mensagem de erro virá no payload e poderá ser exibida pro usuário
            state.photo = {}; //Msm coisa de null, ta assim pra n dar erro
        }).addCase(getPhoto.pending, (state) => { // Caso o fetch do getPhoto estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(getPhoto.fulfilled, (state, action) => { // Caso o fetch do getPhoto estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
        }).addCase(like.fulfilled, (state, action) => { // Caso o fetch do like estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;

            if (state.photo.likes) {
                state.photo.likes.push(action.payload.userId);
            }

            state.photos.map(photo => { // Atualiza a foto no frontend, pra não ter que fazer uma nova requisição  
                if (photo._id === action.payload.photoId) {
                    return photo.likes.push(action.payload.userId);
                }
                return photo;
            });

            state.message = action.payload.message;
        }).addCase(like.rejected, (state, action) => { // Caso o fetch do like tiver sido rejeitado.
            state.loading = false;
            state.error = action.payload; // A mensagem de erro virá no payload e poderá ser exibida pro usuário
        }).addCase(comment.pending, (state) => { // Caso o fetch do comment estiver pendente
            state.loading = true;
            state.error = false;
        })
        .addCase(comment.fulfilled, (state, action) => { // Caso o fetch do comment estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo.comments.push(action.payload.comment);
            state.message = action.payload.message;
        }).addCase(comment.rejected, (state, action) => { // Caso o fetch do comment tiver sido rejeitado.
            state.loading = false;
            state.error = action.payload; // A mensagem de erro virá no payload e poderá ser exibida pro usuário
        }).addCase(getPhotos.pending, (state) => { // Caso o fetch do getPhotos estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(getPhotos.fulfilled, (state, action) => { // Caso o fetch do getPhotos estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
    }
})


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;