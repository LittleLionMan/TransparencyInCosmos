import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const coingeckoData = createAsyncThunk(
    "data/coingeckoData",
    async (cgId) => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cgId}`);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadVals = createAsyncThunk(
    "data/loadVals",
    async (loadVals) => {
        const response = await fetch(loadVals);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadCommunityPool = createAsyncThunk(
    "data/loadCommunityPool",
    async (loadCommunityPool) => {
        const response = await fetch(loadCommunityPool);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadBank = createAsyncThunk(
    "data/loadBank",
    async (loadBank) => {
        const response = await fetch(loadBank);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadDelegations = createAsyncThunk(
    "data/loadDelegations",
    async (loadDelegations) => {
        const response = await fetch(loadDelegations);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState: {
        coingeckoData: {
            description: {},
            links: {
                homepage: []
            },
            market_data: {
                current_price: {
                    usd: 0
                }
            }
        },
        vals: {
            validators: [],
            operator_address: ""
        },
        bank: {
            amount: {
                amount: 0
            }
        },
        communityPool: {
            pool: [
                {amount: 0},
                {amount: 0}
            ]
        },
        delegations: {delegation_responses: []},
        isLoadingData: false,
        hasErrorData: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(coingeckoData.pending, (state) => {
            state.isLoadingData = true;
            state.hasErrorData = false;
             })
            .addCase(coingeckoData.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.coingeckoData = action.payload;
            })
            .addCase(coingeckoData.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
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
            .addCase(loadCommunityPool.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadCommunityPool.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.communityPool = action.payload;
            })
            .addCase(loadCommunityPool.rejected, (state) => {
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

export const isLoadingData = (state) => state.data.isLoadingData;
export const hasErrorData = (state) => state.data.hasErrorData;
export const selectcoingeckoData = (state) => state.data.coingeckoData;
export const selectVals = (state) => state.data.vals.validators;
export const selectBank = (state) => state.data.bank;
export const selectDelegations = (state) => state.data.delegations;
export const selectCommunityPool = (state) => state.data.communityPool;

export default dataSlice.reducer;
