import React, {useEffect} from "react";
import MusicCarousel from "../MusicCarousel";
import TrackList from "../TrackList";
import {useDispatch, useSelector} from "react-redux";
import {fetchMusicThunkAction} from "../../slices/musicsSlice";
import {fetchMusicClientThunkAction, musicManageSlice} from "../../slices/musicManageSlice";

const Home = () => {
    const musicList = useSelector((state) => state.mediaManageReducer.musicList)
    console.log(musicList)
    const dispatch = useDispatch()
    useEffect(() => {
        async function getMusicList() {
            dispatch(fetchMusicClientThunkAction())
        }
        getMusicList()
    }, []);
    return (
        <>
            <MusicCarousel/>
            <TrackList songs={musicList}/>
        </>
    )

}
export default Home