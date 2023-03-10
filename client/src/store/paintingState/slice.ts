import { PaintingState } from '../../../../types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PaintingState = {
    paintings: null,
    enabledFilters: null,
    filters: null,
    painters: null,
    pages: { currentPage: 1, totalPages: null },
};

export const paintingSlice = createSlice({
    name: 'paintings',
    initialState,
    reducers: {
        setPainters: (state, action) => {
            state.painters = action.payload;
        },
        addPainter: (state, action: { payload: string }) => {
            if (!state.painters) {
                state.painters = [action.payload];
            }
            state.painters = [...state.painters, action.payload];
        },
        setPaintings: (state, action) => {
            state.paintings = action.payload;
        },
        resetFilters: (state, action) => {
            state.enabledFilters = null;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        addFilter: (state, action) => {
            if (!state.enabledFilters) {
                state.enabledFilters = [...action.payload];
            }
            state.enabledFilters = [...state.enabledFilters, ...action.payload];
        },
        removeFilter: (state, action) => {
            const newFilters = state.enabledFilters?.filter((i) => {
                return i !== action.payload;
            });
            state.enabledFilters = newFilters;
        },
        increasePage: (state) => {
            if (!state.pages || !state.pages.currentPage) return;
            state.pages.currentPage = state.pages.currentPage + 1;
        },
        decreasePage: (state) => {
            if (!state.pages || !state.pages.currentPage) return;
            state.pages.currentPage = state.pages.currentPage - 1;
        },
        setPage: (state, action) => {
            if (!state.pages) return;
            state.pages.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
            if (!state.pages) return;
            state.pages.totalPages = action.payload;
        },
    },
});

export const {
    setPainters,
    addPainter,
    setPaintings,
    resetFilters,
    setFilters,
    addFilter,
    removeFilter,
    setPage,
    setTotalPages,
    increasePage,
    decreasePage,
} = paintingSlice.actions;

export default paintingSlice.reducer;
