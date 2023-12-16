import {createSelector} from "@reduxjs/toolkit";

export const searchTextSelector = (state) => state.filtersReducer.searchText
export const musicListSelector = (state) => state.musicListReducer.musics
export const leftOverMusics = createSelector(
    musicListSelector,
    searchTextSelector,
    (musicListReducer, searchText) => {
        let filteredMusics = [...musicListReducer]
        if (searchText) {
            filteredMusics = filteredMusics.filter((m) => m.songName.toLowerCase().includes(searchText.toLowerCase()))
        }
        return filteredMusics
    }
)