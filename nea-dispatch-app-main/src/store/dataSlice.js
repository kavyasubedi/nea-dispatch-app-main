import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: {
        test: "test"
    },
};

const dataSlice = createSlice({
    name: 'object',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        emptyData: (state) => {
            state.data = {};
        },
        set: (state, action) => {
            // Corrected version
            state.data = {
                ...state.data,
                ...action.payload
            };
        },
    },
});

export const {set,setData, emptyData} = dataSlice.actions;
export default dataSlice.reducer;
