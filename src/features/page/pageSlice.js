import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        offset: 0
    },
    reducers: {
        nextPage: (state) => {
            state.offset += 10;
        },
        prevPage: (state) => {
            state.offset -= 10;
        }
    }
});

export const { nextPage, prevPage } = pageSlice.actions;
export default pageSlice.reducer;