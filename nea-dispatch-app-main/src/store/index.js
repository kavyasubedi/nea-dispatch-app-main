import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./userSlice.js";
import dataSlice from "./dataSlice.js";

export default configureStore({
    reducer: {
        data: dataSlice,
        user: userSlice,
    },
});

