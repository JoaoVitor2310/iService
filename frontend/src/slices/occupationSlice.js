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
    async(_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await occupationService.getAllOccupations(token);
        return data;
    }
)

export const occupationSlice = createSlice({
    name: 'occupation',
    initialState,
    reducers: {
        resetMessage: state => {
            state.message = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllOccupations.pending, (state) => { // Caso o fetch do getAllOccupations estiver pendente
            state.loading = true;
            state.error = false;
        }).addCase(getAllOccupations.fulfilled, (state, action) => { // Caso o fetch do getAllOccupations estiver sido completado, atualiza o usuário
            state.loading = false;
            state.success = true;
            state.error = null;
            state.occupations = action.payload;
            // console.log(state.occupations);
        })
    }
})

export const { resetMessage } = occupationSlice.actions;
export default occupationSlice.reducer;