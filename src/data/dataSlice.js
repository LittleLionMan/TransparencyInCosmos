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

export const loadSelfStake = createAsyncThunk(
    "data/loadSelfStake",
    async (loadSelfStake) => {
        const response = await fetch(loadSelfStake);
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

export const loadProposals = createAsyncThunk(
    "data/loadProposals",
    async (loadProposals) => {
        const response = await fetch(loadProposals);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadSlashes = createAsyncThunk(
    "data/loadSlashes",
    async (loadSlashes) => {
        const response = await fetch(loadSlashes);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadHeight = createAsyncThunk(
    "data/loadHeight",
    async (loadHeight) => {
        const response = await fetch(loadHeight);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadVotes = createAsyncThunk(
    "data/loadVotes",
    async (loadVotes) => {
        const response = await fetch(loadVotes);
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

export const loadAuthz = createAsyncThunk(
    "data/loadAuthz",
    async (loadAuthz) => {
        const response = await fetch(loadAuthz);
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
            },
            image: {}
        },
        vals: {
            validators: [],
            operator_address: "",
            description: {
                moniker: ""
            }
        },
        votes: {
            txs: [{
                body: {
                    messages: [{proposal_id: ""}]
                }
            }]
        },
        authz: {
            txs: [{
                body: {
                   messages: [{
                    msgs: [{proposal_id: ""}]
                   }] 
                }
            }]
        },
        bank: {
            amount: {
                amount: 0
            }
        },
        selfStake: {result: [{
                delegation: {
                    share: ""
                }
            }]
        },
        communityPool: {
            pool: [
                {amount: 0},
                {amount: 0}
            ]
        },
        slashes: {slashes: []},
        height: {result: {response: {last_block_height: 0}}},
        delegations: {delegation_responses: []},
        proposals: {proposals: []},
        isLoadingData: false,
        isLoadingDelegations: false,
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
            .addCase(loadSelfStake.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadSelfStake.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.selfStake = action.payload;
            })
            .addCase(loadSelfStake.rejected, (state) => {
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
                state.isLoadingDelegations = true;
                state.hasErrorData = false;
            })
            .addCase(loadDelegations.fulfilled, (state, action) => {
                state.isLoadingDelegations = false;
                state.hasErrorData = false;
                state.delegations = action.payload;
            })
            .addCase(loadDelegations.rejected, (state) => {
                state.isLoadingDelegations = false;
                state.hasErrorData = true;
            })
            .addCase(loadProposals.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadProposals.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.proposals = action.payload;
            })
            .addCase(loadProposals.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
            .addCase(loadSlashes.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadSlashes.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.slashes = action.payload;
            })
            .addCase(loadSlashes.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
            .addCase(loadHeight.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadHeight.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.height = action.payload;
            })
            .addCase(loadHeight.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
            .addCase(loadVotes.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadVotes.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.votes = action.payload;
            })
            .addCase(loadVotes.rejected, (state) => {
                state.isLoadingData = false;
                state.hasErrorData = true;
            })
            .addCase(loadAuthz.pending, (state) => {
                state.isLoadingData = true;
                state.hasErrorData = false;
            })
            .addCase(loadAuthz.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.hasErrorData = false;
                state.authz = action.payload;
            })
            .addCase(loadAuthz.rejected, (state) => {
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
export const isLoadingDelegations = (state) => state.data.isLoadingDelegations;
export const hasErrorData = (state) => state.data.hasErrorData;
export const selectcoingeckoData = (state) => state.data.coingeckoData;
export const selectVals = (state) => state.data.vals.validators;
export const selectSelfStake = (state) => state.data.selfStake;
export const selectBank = (state) => state.data.bank;
export const selectDelegations = (state) => state.data.delegations;
export const selectProposals = (state) => state.data.proposals;
export const selectSlashes = (state) => state.data.slashes;
export const selectVotes = (state) => state.data.votes;
export const selectAuthz = (state) => state.data.authz;
export const selectHeight = (state) => state.data.height;
export const selectCommunityPool = (state) => state.data.communityPool;

export default dataSlice.reducer;
