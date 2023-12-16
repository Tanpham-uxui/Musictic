import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const mediaSlice = createSlice({
    name:'playing',
    initialState:{
        audioDetails: {},
        audioStatus: false
    },
    reducers: {
        fetchMusics: (state, action) => {
            state = action.payload
        },
        getMusicInfos: (state,action) => {
            state.audioDetails = action.payload
        },
        audioStatusUpdate: (state, action) => {
            state.audioStatus = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPlayingMusicThunkAction.pending, (state, action)=>{
            state.status = 'loading'
        })
        .addCase(fetchPlayingMusicThunkAction.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.audioDetails = [...action.payload]
        })
    }

})

export const fetchPlayingMusicThunkAction = createAsyncThunk(
    'playing/fetchPlayingMusicThunkAction',
    async (musicId) => {
        let musicRes = await fetch(`https://jsonserver-navy.vercel.app/Songs/${musicId}`)
        let data = await musicRes.json()
        return data
    }
)