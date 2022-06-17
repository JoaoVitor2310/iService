import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import photoService from '../services/photoService';

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

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

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
        })
    }
})


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;