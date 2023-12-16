import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, Stack} from "@mui/joy";
import {Box, Button, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Pause, Play} from "../Icon/MusicLogo";
import {mediaSlice} from "../../slices/mediaSlice";

const HomeMusicCard = ({song}) => {
    const theme = useTheme();
    const [playing, setPlaying] = useState(false)
    const dispatch = useDispatch()
    const checkPlayingMusic = useSelector((state) => state.mediaReducer.audioDetails)
    const checkAudioPause = useSelector((state) => state.mediaReducer.audioStatus)
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
    return (
        <Card sx={{height: "100%", padding: 0}} >
            <Stack direction="row" justifyContent="space-between">
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h6" sx={{maxWidth:"18ch", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
                            {song.songName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {song.artist}
                        </Typography>
                    </CardContent>
                    <Stack sx={{margin:"0.5rem"}} direction="row" alignItems="center">
                        {playing && checkAudioPause ?
                            <Button disabled><Pause/></Button> :
                            <Button onClick={handlePlaySong}><Play/></Button>
                        }{
                        playing && checkAudioPause ? <Typography variant="subtitle1">Playing...</Typography> : ""}
                        <audio id={song.id} src={song.audio}></audio>
                    </Stack>

                </Box>
                <CardMedia
                    component="img"
                    sx={{width: 151, objectFit: "contain", padding: 0, borderRadius:"0.5rem"}}
                    image={song.thumbnail}
                    alt="Live from space album cover"

                />
            </Stack>
        </Card>
    );
}

export default HomeMusicCard