import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const mediumData = createAsyncThunk(
    "blog/mediumData",
    async () => {
        const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mehulkothari05");
        const jsonResponse = await response.json();
        return jsonResponse; 
    }
)

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        medium: {
            items: [],
            feed: {},

        },
        isLoadingMedium: false,
        hasErrorMedium: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(mediumData.pending, (state) => {
            state.isLoadingMedium = true;
            state.hasErrorMedium = false;
             })
            .addCase(mediumData.fulfilled, (state, action) => {
                state.isLoadingMedium = false;
                state.hasErrorMedium = false;
                state.medium = action.payload;
            })
            .addCase(mediumData.rejected, (state) => {
                state.isLoadingMedium = false;
                state.hasErrorMedium = true;
            });
    }
});

export const isLoadingMedium = (state) => state.blog.isLoadingMedium;
export const hasErrorMedium = (state) => state.blog.hasErrorMedium;
export const selectMedium = (state) => state.blog.medium;

export default blogSlice.reducer;