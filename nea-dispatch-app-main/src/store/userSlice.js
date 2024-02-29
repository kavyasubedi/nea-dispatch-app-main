import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 0,
    username: '',
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.id = 0;
            state.username = '';
            state.email = '';
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
