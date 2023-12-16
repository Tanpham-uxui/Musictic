import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
export const musicManageSlice = createSlice({
    name: 'manageMusic',
    initialState:{
        status:"idle",
        musicList:[]
    },
    reducers: {
        fetchMusics: (state, action) => {
            state = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchMusicClientThunkAction.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMusicClientThunkAction.fulfilled, (state, action) => {
                state.status = 'idle'
                state.musicList = [...action.payload]
            })
    }
})
export const fetchMusicClientThunkAction = createAsyncThunk(
    'musicList/fetchMusicThunkAction',
    async () => {
        let musicRes = await fetch('https://jsonserver-m2v4.vercel.app/Songs')
        let data = await musicRes.json()
        data = data.sort(function (item_1, item_2) {
            return Number(item_2.id - item_1.id)
        })
        return data
    }
)