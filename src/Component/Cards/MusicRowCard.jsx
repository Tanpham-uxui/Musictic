import React, {useEffect, useState} from "react";
import {Avatar, Typography, Button} from "@mui/material";
import {Pause, Play} from "../Icon/MusicLogo";
import {useDispatch, useSelector} from "react-redux";
import {mediaSlice} from "../../slices/mediaSlice";
import Anime from "react-anime";

function MusicRowCard({song}) {
    const dispatch = useDispatch()
    const checkPlayingMusic = useSelector((state) => state.mediaReducer.audioDetails)
    const checkAudioPause = useSelector((state) => state.mediaReducer.audioStatus)
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        setPlaying(false)
        if (checkPlayingMusic.id === song.id) {
            setPlaying(true)
        }
    }, [checkPlayingMusic])
    const handlePlaySong = () => {
        dispatch(mediaSlice.actions.getMusicInfos(song))
        dispatch(mediaSlice.actions.audioStatusUpdate(true))
    }
    const handlePauseSong = () => {
        dispatch(mediaSlice.actions.audioStatusUpdate(true))
    }
    return (
        <tr>
            <td>
                <Avatar src={song.thumbnail}/>
            </td>
            <td><Typography variant="body2">{song.songName}</Typography></td>
            <td><Typography variant="body2">{song.artist}</Typography></td>
            <td><Typography variant="body2">{song.musician}</Typography></td>
            <td><Typography variant="body2">{song.album}</Typography></td>
            <td>
                {playing && checkAudioPause ? <Button onClick={handlePauseSong}><Pause/></Button> :
                    <Button onClick={handlePlaySong}><Play/></Button>
                }
                <audio id={song.id} src={song.audio}></audio>
            </td>
        </tr>
    )
}

export default MusicRowCard
