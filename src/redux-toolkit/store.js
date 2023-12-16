import {configureStore} from "@reduxjs/toolkit";
import musicsSlice from "../slices/musicsSlice";
import filtersSlice from "../slices/filtersSlice";
import {mediaSlice} from "../slices/mediaSlice";
import {musicManageSlice} from "../slices/musicManageSlice";

const store = configureStore({
    reducer: {
        musicListReducer: musicsSlice.reducer,
        filtersReducer: filtersSlice.reducer,
        mediaReducer: mediaSlice.reducer,
        mediaManageReducer: musicManageSlice.reducer
    }
})

export default store