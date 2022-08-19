import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadJunoVals = createAsyncThunk(
    "data/loadJunoVals",
    async () => {
        const response = await fetch("https://api.juno.pupmos.network/cosmos/staking/v1beta1/validators?&pagination.limit=500"
        );
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadJunoBank = createAsyncThunk(
    "data/loadJunoBank",
    async (denom) => {
        const response = await fetch(`https://api.juno.pupmos.network/cosmos/bank/v1beta1/supply/${denom}`
        );
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState: {
        vals: {validators: []},
        bank: {
            amount: {
                amount: 0
            }
        },
        isLoadingData: false,
        hasErrorData: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadJunoVals.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadJunoVals.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.vals = action.payload;
            })
            .addCase(loadJunoVals.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
            .addCase(loadJunoBank.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadJunoBank.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.bank = action.payload;
            })
            .addCase(loadJunoBank.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            });
    }
});

export const selectVals = (state) => state.data.vals.validators;
export const isLoadingData = (state) => state.data.isLoadingData;
export const hasErrorData = (state) => state.data.hasErrorData;
export const selectBank = (state) => state.data.bank;

export default dataSlice.reducer;
