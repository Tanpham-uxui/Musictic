import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, Container, Grid, Typography, IconButton, ClickAwayListener} from "@mui/material";
import {Stack} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {FastFwd, Mute, Pause, Play, Repeat, Rewind, SkipBack, VolumeDown, VolumeUp} from "./Icon/MusicLogo";
import {styled, useTheme} from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import {mediaSlice} from "../slices/mediaSlice";
import {CancelRounded} from "@mui/icons-material";
const Widget = styled("div")(({theme}) => ({
    padding: 30,
    borderRadius: 16,
    maxWidth: "100%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
}));
function BottomMusicPlayer() {
    const dispatch = useDispatch()
    const theme = useTheme();
    const playingMusic = useSelector((state) => state.mediaReducer.audioDetails)
    const [isPlaying, setIsPlaying] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [loop, setLoop] = useState(false)
    const [displayVolSlider, setDisplayVolSlider] = useState(false)
    const [muted, setMuted] = useState(false)
    const [volumeDown, setVolumeDown] = useState(false)
    const musicId = document.getElementById(playingMusic.id)
    let duration
    useEffect(() => {
        const musicId = document.getElementById(playingMusic.id)
        setCurrentTime(0);
        setIsPlaying(true);
        if (playingMusic.audio) {
            setIsPlaying(true)
        }
        if (musicId) {
            const updateTime = () => {
                setCurrentTime(musicId.currentTime)
            }
            musicId.addEventListener('timeupdate', updateTime)
            return () => {
                musicId.removeEventListener("timeupdate", updateTime);
            };
        }
    }, [playingMusic]);

    if (musicId) {
        duration = musicId.duration
        musicId.onended = () => {
            dispatch(mediaSlice.actions.audioStatusUpdate(false))
        }
        musicId.onplay = () => {
            dispatch(mediaSlice.actions.audioStatusUpdate(true))
        }
        musicId.onpause = () => {
            dispatch(mediaSlice.actions.audioStatusUpdate(false))
        }
    }
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const TinyText = styled(Typography)({
        fontSize: "0.75rem",
        opacity: 0.38,
        fontWeight: 500,
        letterSpacing: 0.2,
    });

    const pauseTheMusic = () => {
        musicId.pause()
        setIsPlaying(!isPlaying)
    }
    const playTheMusic = () => {
        musicId.play()
        setIsPlaying(!isPlaying)
    }

    function handleFastFwd() {
        musicId.currentTime = musicId.currentTime + 10
    }

    function handleRewind() {
        musicId.currentTime = musicId.currentTime - 10
    }

    function handleChangeCurrentTime(e) {
        musicId.currentTime = e.target.value
    }
    function handleChangeVolume(e) {
        const volumeFormat = Number(e.target.value/100)
        musicId.volume = volumeFormat
        if (volumeFormat == 0){
            setMuted(true)
        } else if ( volumeFormat < 0.4 ) {
            setMuted(false)
            setVolumeDown(true)
        } else {
            setMuted(false)
            setVolumeDown(false)
        }
    }
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }
    function handleCloseTab(){
        dispatch(mediaSlice.actions.getMusicInfos({}))
    }
    return (
        <Stack sx={{
            position: "fixed",
            zIndex: 10000,
            bottom: 0,
            width: "100%",
            backgroundColor: "rgba(25,25,25,0.94)",
            height: '5rem'
        }}
               className={'blur-bg'}
               direction="row">
            <Container>
                <Stack direction="column" justifyContent="space-around" sx={{height: "100%"}}>
                    <Grid container direction="row" alignItems="center">
                        <Grid item md={3}>
                            <Stack direction="row" alignItems={"center"} spacing={3}>
                                <Box sx={{height: "4rem", width: "4rem"}}>
                                    <Avatar src={playingMusic.thumbnail} sx={{width: "100%", height: "100%"}}></Avatar>
                                </Box>
                                <Stack direction="column">
                                    <Typography sx={{fontWeight: "bold"}}
                                                variant="subtitle1">{playingMusic.songName}</Typography>
                                    <Typography variant="subtitle2">{playingMusic.artist}</Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item md={7}>
                            <Stack direction="row" alignItems="center">
                                <IconButton sx={{height: "3rem", width: "3rem"}} onClick={handleRewind}>
                                    <Rewind width={'1.5rem'} height={'1.5rem'}/>
                                </IconButton>
                                {isPlaying ?
                                    <IconButton onClick={pauseTheMusic} sx={{height: "3rem", width: "3rem"}}><Pause
                                        width={'2rem'}
                                        height={'2rem'}/></IconButton> :
                                    <IconButton onClick={playTheMusic} sx={{height: "3rem", width: "3rem"}}>
                                        <Play width={'2rem'} height={'2rem'}/>
                                    </IconButton>
                                }
                                <IconButton sx={{height: "3rem", width: "3rem"}} onClick={handleFastFwd}>
                                    <FastFwd width={'1.5rem'} height={'1.5rem'}/>
                                </IconButton>
                                <Box sx={{width: "100%", overflow: "hidden"}}>
                                    <Widget>
                                        <Slider
                                            aria-label="time-indicator"
                                            size="small"
                                            value={currentTime}
                                            min={0}
                                            step={1}
                                            max={duration}
                                            onChange={(e) => handleChangeCurrentTime(e)}
                                            sx={{
                                                color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                                                height: 4,
                                                "& .MuiSlider-thumb": {
                                                    width: 10,
                                                    height: 10,
                                                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                                                    "&:before": {
                                                        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                                                    },
                                                    "&:hover, &.Mui-focusVisible": {
                                                        boxShadow: `0px 0px 0px 8px ${
                                                            theme.palette.mode === "dark"
                                                                ? "rgb(255 255 255 / 16%)"
                                                                : "rgb(0 0 0 / 16%)"
                                                        }`,
                                                    },
                                                    "&.Mui-active": {
                                                        width: 20,
                                                        height: 20,
                                                    },
                                                },
                                                "& .MuiSlider-rail": {
                                                    opacity: 0.28,
                                                },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                mt: -2,
                                            }}
                                        >
                                            <TinyText>{formatDuration(currentTime)}</TinyText>
                                            <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
                                        </Box>
                                    </Widget>
                                </Box>
                                <IconButton onClick={() => setLoop(!loop)} sx={{height: "3rem", width: "3rem"}}>
                                    <Repeat width={'1.5rem'} height={'1.5rem'}
                                            fill={`${loop ? '#0b6bcb' : 'RGBA(182,187,196,0.7)'}`}/>
                                </IconButton>
                                <Stack direction="column" alignItems={"center"}>
                                    <Box sx={{ height:"5rem" , position:"fixed", bottom: "4rem"}}>
                                        {displayVolSlider && <Slider
                                            sx={{
                                                '& input[type="range"]': {
                                                    WebkitAppearance: 'slider-vertical',
                                                },
                                            }}
                                            orientation="vertical"
                                            defaultValue={30}
                                            aria-label="Temperature"
                                            valueLabelDisplay="auto"
                                            onChange={(e) => handleChangeVolume(e)}
                                            onKeyDown={preventHorizontalKeyboardNavigation}
                                        />
                                        }
                                    </Box>
                                    <IconButton className="vol-btn" onClick={()=>setDisplayVolSlider(!displayVolSlider)}>
                                        {muted ? <Mute/> : (volumeDown ? <VolumeDown/>  : <VolumeUp/>)}
                                    </IconButton>

                                </Stack>
                                <IconButton sx={{marginLeft:"2rem"}} onClick={handleCloseTab}>
                                    <CancelRounded/>
                                </IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
            <audio id={playingMusic.id} autoPlay={isPlaying} src={playingMusic.audio} loop={loop} muted={muted}></audio>
        </Stack>
    )
}
export default BottomMusicPlayer