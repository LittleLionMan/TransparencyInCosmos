import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadJunoData = createAsyncThunk(
    "data/loadJunoVals",
    async () => {
        const response = await fetch("https://api.juno.pupmos.network/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=500"
        );
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: {validators: []},
        isLoadingData: false,
        hasErrorData: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadJunoData.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadJunoData.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.data = action.payload;
            })
            .addCase(loadJunoData.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            });
    }
});

export const selectData = (state) => state.data.data;
export const selectVals = (state) => state.data.data.validators;
export const isLoadingData = (state) => state.data.isLoadingData;
export const hasErrorData = (state) => state.data.hasErrorData;

export default dataSlice.reducer;
