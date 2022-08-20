import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadVals = createAsyncThunk(
    "data/loadVals",
    async (loadVals) => {
        const response = await fetch(loadVals);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadBank = createAsyncThunk(
    "data/loadJunoBank",
    async (loadBank) => {
        const response = await fetch(loadBank);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadDelegations = createAsyncThunk(
    "data/loadJunoDelegations",
    async (loadDelegations) => {
        const response = await fetch(loadDelegations);
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
        delegations: {delegation_responses: []},
        isLoadingData: false,
        hasErrorData: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadVals.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadVals.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.vals = action.payload;
            })
            .addCase(loadVals.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
            .addCase(loadDelegations.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadDelegations.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.delegations = action.payload;
            })
            .addCase(loadDelegations.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
            .addCase(loadBank.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadBank.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.bank = action.payload;
            })
            .addCase(loadBank.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            });
    }
});

export const selectVals = (state) => state.data.vals.validators;
export const isLoadingData = (state) => state.data.isLoadingData;
export const hasErrorData = (state) => state.data.hasErrorData;
export const selectBank = (state) => state.data.bank;
export const selectDelegations = (state) => state.data.delegations;

export default dataSlice.reducer;
